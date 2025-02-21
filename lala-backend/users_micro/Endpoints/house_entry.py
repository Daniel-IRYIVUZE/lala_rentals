from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.connection import db_dependency
from schemas.schemas import HouseCreate
from functions.send_mail import send_new_email
from emailsTemps.custom_email_send import custom_email
from models.userModels import Users,House,Booking
from db.VerifyToken import user_dependency

router = APIRouter(prefix="/api", tags=["House Management"])

@router.post("/house", )
def create_house(db: db_dependency, user: user_dependency, house_data: HouseCreate):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication failed")

    house = House(**house_data.dict(), owner_id=user["user_id"])
    db.add(house)
    db.commit()
    db.refresh(house)
    return {"message": "House created successfully", "house": house}

@router.get("/house", )
def get_all_houses(db: db_dependency):
    return db.query(House).filter(House.available).all()

@router.get("/house/customers")
def get_booked_users(db: db_dependency, user: user_dependency):
    # Get all houses owned by the logged-in user
    houses = db.query(House).filter(House.owner_id == user["user_id"]).all()

    if not houses:
        raise HTTPException(status_code=404, detail="No houses found")

    house_ids = [house.id for house in houses]

    # Get all bookings for these houses
    bookings = db.query(Booking).filter(Booking.house_id.in_(house_ids)).all()

    if not bookings:
        return {"message": "No bookings found for your houses", "houses": houses}

    # Get user details for those who booked
    user_ids = list(set(booking.user_id for booking in bookings))  # Avoid duplicates
    users = {u.id: u for u in db.query(Users).filter(Users.id.in_(user_ids)).all()}  # Use a dictionary for faster lookups

    # Structure the response
    response = []
    for house in houses:
        house_bookings = [b for b in bookings if b.house_id == house.id]
        
        response.append({
            "house": {
                "id": house.id,
                "title": house.title,
                "location": house.location,
                "price": house.price
            },
            "bookings": [
                {
                    "booking_id": b.id,
                    "user": {
                        "id": users[b.user_id].id,
                        "name": users[b.user_id].full_name,
                        "email": users[b.user_id].email
                    },
                    "status": b.status,
                    "checkin": b.checkin.isoformat(),
                    "checkout": b.checkout.isoformat(),
                    "created_at": b.created_at.isoformat()
                } for b in house_bookings
            ]
        })

    return response


@router.get("/house{house_id}", )
def get_house_by_id(db: db_dependency, house_id: int):
    house = db.query(House).filter(House.id == house_id).first()
    if not house:
        raise HTTPException(status_code=404, detail="House not found")
    return house

@router.get("/house/me", )
def get_house_by_id(db: db_dependency,user:user_dependency):
    house = db.query(House).filter(House.owner_id == user["user_id"]).all()
    if not house:
        raise HTTPException(status_code=404, detail="House not found")
    return house

@router.put("/house{house_id}", )
def update_house(db: db_dependency, user: user_dependency, house_id: int, house_data: HouseCreate):
    house = db.query(House).filter(House.id == house_id, House.owner_id == user["user_id"]).first()
    if not house:
        raise HTTPException(status_code=403, detail="Not authorized to update this house")

    for key, value in house_data.dict().items():
        setattr(house, key, value)

    db.commit()
    db.refresh(house)
    return {"message": "House updated successfully", "house": house}

@router.delete("/house{house_id}", )
def delete_house(db: db_dependency, user: user_dependency, house_id: int):
    house = db.query(House).filter(House.id == house_id, House.owner_id == user["user_id"]).first()
    if not house:
        raise HTTPException(status_code=403, detail="Not authorized to delete this house")

    db.delete(house)
    db.commit()
    return {"message": "House deleted successfully"}
