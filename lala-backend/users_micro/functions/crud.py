from db.connection import db_dependency
from models.userModels import Users,House
from schemas.schemas  import HouseCreate
from db.VerifyToken import user_dependency
# Create House
def create_house(db: db_dependency,user:user_dependency, house_data: HouseCreate, owner_id: int):
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Authentication failed",
        )
    new_house = House(**house_data.dict(), owner_id=owner_id)
    db.add(new_house)
    db.commit()
    db.refresh(new_house)
    return new_house

# Get All Houses
def get_houses(db: db_dependency):
    return db.query(House).all()

# Get House by ID
def get_house_by_id(db: db_dependency,user:user_dependency, house_id: int):
    return db.query(House).filter(House.id == house_id).first()

# Update House
def update_house(db: db_dependency,user:user_dependency, house_id: int, house_data: HouseCreate):
    house = db.query(House).filter(House.id == house_id).first()
    if house:
        for key, value in house_data.dict().items():
            setattr(house, key, value)
        db.commit()
        db.refresh(house)
    return house

# Delete House
def delete_house(db: db_dependency,user:user_dependency, house_id: int):
    house = db.query(House).filter(House.id == house_id).first()
    if house:
        db.delete(house)
        db.commit()
    return house
