import React from 'react'

export default function BookHouse() {
    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-4">Book a House</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Check-in Date</label>
                        <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Check-out Date</label>
                        <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Book Now
                    </button>
                </form>
            </div>
        </>
    )
}
