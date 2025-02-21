from pydantic import BaseModel, EmailStr,conlist, validator,root_validator,ValidationError,Field
from typing import List, Optional, Literal
from datetime import date, datetime
from schemas.returnSchemas import ReturnUser


class CreateUserRequest(BaseModel):  # Registration Schema
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    id_number: Optional[str] = None
    nationality: Optional[str] = None
    profile: Optional[str] = None
    role: Optional[str] = None  # Added role field 


class Token(BaseModel):  # token validation schema
    access_token: Optional[str] = None
    token_type: Optional[str] = None
    UserInfo: ReturnUser


class FromData(BaseModel):  # token validation schema
    email: Optional[str]
    password: Optional[str]


class HouseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    address: str
    location: str
    price: float
    bedrooms: int
    bathrooms: int
    size: Optional[float] = None
    furnished: bool = False
    available: bool = True
    image_url: Optional[str] = None

class HouseResponse(HouseCreate):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    house_id: int
    checkin: datetime
    checkout: datetime

class BookingResponse(BookingCreate):
    id: int
    user_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True