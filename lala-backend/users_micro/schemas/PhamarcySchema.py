from pydantic import BaseModel, EmailStr,conlist, validator,root_validator,ValidationError,Field
from typing import List, Optional, Literal
from datetime import date, datetime
from schemas.returnSchemas import ReturnUser

class Pharmacy_admin(BaseModel):
    pharmacy_contact_phone: str
    pharmacy_contact_email: EmailStr
    password: str

    class Config:
        orm_mode = True

# --------------------- request
class RequestPharmacySchema(BaseModel):
    pharmacy_name: str =None
    pharmacy_general_type: str =None
    pharmacy_country: str =None
    pharmacy_district: str =None
    pharmacy_sector: str =None
    pharmacy_cell: str =None
    pharmacy_latitude: Optional[float]=None
    pharmacy_longitude: Optional[float]=None
    pharmacy_street: Optional[str]=None
    pharmacy_logo: Optional[str]=None
    pharmacy_website: Optional[str]=None
    pharmacy_contact_phone: Optional[List[str]]=None
    pharmacy_contact_email: Optional[List[str]]=None
    pharmacy_specialization: List[str]=None
    pharmacy_legal_prove: str=None
    pharmacy_license_number: str=None
    pharmacy_insurance: Optional[List[str]]=None
    pharmacy_specialized_equipment: Optional[List[str]]=None
    pharmacy_billing_methods: List[str]=None
    pharmacy_request_to: str =None

    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm

    
# --------------------- request
class ReturnPharmacySchema(BaseModel):
    branch_name: Optional[str] =None
    branch_general_type: Optional[str] =None
    branch_country: Optional[str] =None
    branch_district: Optional[str] =None
    branch_sector: Optional[str] =None
    branch_cell: Optional[str] =None
    branch_latitude: Optional[float]=None
    branch_longitude: Optional[float]=None
    branch_street: Optional[str]=None
    branch_logo: Optional[str]=None
    branch_website: Optional[str]=None
    branch_contact_phone: Optional[List[str]]=None
    branch_contact_email: Optional[List[str]]=None
    branch_specialization: Optional[str] = None
    branch_legal_prove: Optional[str]=None
    branch_license_number: Optional[str]=None
    branch_insurance: Optional[List[str]]=None
    branch_specialized_equipment: Optional[List[str]]=None
    branch_billing_methods: List[str]=None
    branch_request_to: Optional[str] =None
    branch_approved_by: Optional[int]
    PharmacyId: Optional[int]

    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm

    
class UpdatePharmacySchema(BaseModel):
    pharmacy_name: str =None
    pharmacy_general_type: str =None
    pharmacy_country: str =None
    pharmacy_district: str =None
    pharmacy_sector: str =None
    pharmacy_cell: str =None
    pharmacy_latitude: Optional[float]=None
    pharmacy_longitude: Optional[float]=None
    pharmacy_street: Optional[str]=None
    pharmacy_logo: Optional[str]=None
    pharmacy_website: Optional[str]=None
    pharmacy_contact_phone: Optional[List[str]]=None
    pharmacy_contact_email: Optional[List[str]]=None
    pharmacy_specialization: List[str]=None
    pharmacy_legal_prove: str=None
    pharmacy_license_number: str=None
    pharmacy_insurance: Optional[List[str]]=None
    pharmacy_specialized_equipment: Optional[List[str]]=None
    pharmacy_billing_methods: List[str]=None
    pharmacy_request_to: str =None

    class Config:
        orm_mode = True
        from_attributes = True  # Enable this to use from_orm