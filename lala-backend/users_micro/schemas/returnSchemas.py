from pydantic import BaseModel, EmailStr,validator,Field
from typing import List, Optional, Literal
from datetime import date,datetime


class ReturnUser(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    # password: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    id_number: Optional[str] = None
    nationality: Optional[str] = None
    profile: Optional[str] = None
    role: Optional[str] = None  # Added role field 
    
    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm
