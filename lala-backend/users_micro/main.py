from enum import Enum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from Endpoints import auth,otp,house_entry,booking_entry
from fastapi.responses import HTMLResponse
   
app = FastAPI(
    title="Users LALA Rentals Api Documentation(microService One)",  # Replace with your desired title
    description="LALA Rentals aims to revolutionize House Rentals",
)

# Configure CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this to the specific methods you want to allow (e.g., ["GET", "POST"])
    allow_headers=["*"],  # Adjust this to the specific headers you want to allow (e.g., ["Content-Type", "Authorization"])
)

# Include the routers from auth, apis, and otp
app.include_router(otp.router)
app.include_router(auth.router)
app.include_router(house_entry.router)
app.include_router(booking_entry.router)
# Define your routes and include dependencies
@app.get("/", response_class=HTMLResponse)
async def read_root():
    html_content = """
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LALA Rentals|  House Rentals Platform</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="container mx-auto py-8">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold text-blue-900">LALA Rentals House Rentals Platform</h1>
            <p class="mt-2 text-lg text-gray-700">Revolutionizing LALA in Africa with digital innovation.</p>
        </header>

        <section class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Users Micro Service</h2>
            <p class="text-gray-700">LALA Rentalsaims to revolutionize  House Rentals in Africa by providing a comprehensive digital platform. This platform will address common issues like data mismanagement, donor matching, and information sharing between hospitals. By leveraging technology, LALA Rentalswill enhance the accuracy, efficiency, and accessibility of healthcare services.</p>

            <div class="mt-6 text-center">
                <a href="/docs" class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">Swagger Documentation</a>
                <a href="/redoc" class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">Redoc Documentation</a>
            </div>
        </section>
    </div>
</body>

</html>
    """
    return HTMLResponse(content=html_content)