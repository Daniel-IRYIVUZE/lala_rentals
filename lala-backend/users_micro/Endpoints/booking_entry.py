from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.connection import db_dependency
from schemas.schemas import BookingCreate
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email
from models.userModels import Users,Booking,House
from db.VerifyToken import user_dependency

router = APIRouter(prefix="/api", tags=["Booking"])

@router.post("/booking", )
def create_booking(db: db_dependency, user: user_dependency, booking_data: BookingCreate):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication failed")

    house = db.query(House).filter(House.id == booking_data.house_id).first()
    if not house:
        raise HTTPException(status_code=404, detail="House not found")

    booking = Booking(
        house_id=booking_data.house_id,
        user_id=user["user_id"],
        checkin=booking_data.checkin,
        checkout=booking_data.checkout,
        status="pending"
    )
    #update house availabile to false
    house.available = False
    db.add(house)
    db.add(booking)
    db.commit()
    db.refresh(booking)

    # Get house owner details
    owner = db.query(Users).filter(Users.id == house.owner_id).first()
    if owner:
        heading = "New Booking Request"
        body = f"{owner.full_name} has requested to book your house: {house.title}"
        msg = custom_email(owner.full_name, heading, body)
        send_new_email(owner.email, "New Booking Request", msg)

    return {"message": "Booking created successfully", "booking": booking}

@router.get("/booking", )
def get_all_bookings(db: db_dependency):
    return db.query(Booking).all()

@router.get("/booking/user", )
def get_user_bookings(db: db_dependency, user: user_dependency):
    return db.query(Booking).filter(Booking.user_id == user["user_id"]).all()

@router.put("/booking{booking_id}", )
def update_booking_status(db: db_dependency, user: user_dependency, booking_id: int, status: str):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    house = db.query(House).filter(House.id == booking.house_id).first()
    if not house or house.owner_id != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this booking")

    booking.status = status
    db.commit()
    db.refresh(booking)

    # Notify the user
    renter = db.query(Users).filter(Users.id == booking.user_id).first()
    if renter:
        heading = "Booking Status Updated"
        body = f"Your booking for {house.title} is now {status}."
        msg = custom_email(renter.full_name, heading, body)
        send_new_email(renter.email, "Booking Status Update", msg)

    return {"message": "Booking status updated successfully", "booking": booking}

@router.delete("/booking{booking_id}", )
def delete_booking(db: db_dependency, user: user_dependency, booking_id: int):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == user["user_id"]).first()
    if not booking:
        raise HTTPException(status_code=403, detail="Not authorized to delete this booking")

    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted successfully"}
