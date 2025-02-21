from sqlalchemy import Column, Integer, String,Text, Boolean, Float, Date, ForeignKey,DateTime,ARRAY
from db.database import Base
from datetime import date
from datetime import datetime
from sqlalchemy.orm import relationship

class Users(Base):
    __tablename__ = "users"
    #user info -----
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=True, default="")
    email = Column(String(255), unique=True, nullable=True, default="")  # Non-nullable for uniqueness
    password = Column(String(255), nullable=True, default="")
    phone = Column(String(15), nullable=True, default="")
    location = Column(String(255), nullable=True, default="")
    id_number = Column(String(20), nullable=True, default="")
    nationality = Column(String(255),nullable=True, default="")  # Non-nullable for uniqueness
    profile = Column(Text, default="", nullable=True)
    role = Column(String(255), default="", nullable=True)
   
class OTP(Base):
    __tablename__ = "sent_otps"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, index=True)
    otp_code = Column(String, index=True)
    verification_code = Column(String, index=True)
    purpose = Column(String, index=True)
    date = Column(DateTime, default=datetime.utcnow, index=True)

    
class House(Base):
    __tablename__ = "houses"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    address = Column(String, nullable=False)
    location = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    size = Column(Float, nullable=True)
    furnished = Column(Boolean, default=False)
    available = Column(Boolean, default=True)
    image_url = Column(Text, nullable=True)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    house_id = Column(Integer, nullable=False)
    user_id = Column(Integer,  nullable=False)
    status = Column(String, nullable=False, default="pending")  # pending, approved, canceled
    checkin = Column(DateTime, nullable=False)
    checkout = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
