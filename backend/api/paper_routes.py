from fastapi import APIRouter

router = APIRouter()

@router.get("/paper")

def get_paper():
    return ["ppp"]

