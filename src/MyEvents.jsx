import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Ticket, DollarSign, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";


const TicketDetailsPopup = ({ ticket, onClose }) => {


  const price = Number(ticket.price) || 0;
  const ticketCount = Number(ticket.tickets_booked) || 0;

  const subtotal = price * ticketCount;
  const totalBookingFee = 0.02 * subtotal;
  const total = subtotal + totalBookingFee;


  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[100vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Ticket Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <img
                src={ticket.image_url}
                alt={ticket.event_name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{ticket.event_name}</h3>
                <div className="flex items-center text-gray-600 mt-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(ticket.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })} - {ticket.event_time?.slice(0, 5)}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{ticket.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center mb-2">
                <Ticket className="w-5 h-5 text-[#1A73E8] mr-2" />
                <span className="font-medium text-gray-700">Booking Information</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-gray-600">Booking ID</div>
                <div className="font-medium text-gray-800">{ticket.id}</div>
                <div className="text-gray-600">Number of Tickets</div>
                <div className="font-medium text-gray-800">{ticket.tickets_booked}</div>
                <div className="text-gray-600">Booking Date</div>
                <div className="font-medium text-gray-800">{new Date(ticket.booking_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}</div>
                <div className="text-gray-600">Status</div>
                <div className="font-medium">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    confirmed
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-[#1A73E8] mr-2" />
                <span className="font-medium text-gray-700">Price Details</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Ticket Price</span>
                  <span>₹{price.toFixed(2)} × {ticketCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Booking Fee (2%)</span>
                  <span>₹{totalBookingFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-[#1A73E8]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                Please show this ticket at the venue entrance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




const BookedEventCard = ({ event, onCancel, onViewTicket }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 h-48 md:h-auto">
        <img
          src={event.image_url}
          alt={event.name}
          className="w-full h-53 object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.event_name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date(event.event_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })} - {event.event_time?.slice(0, 5)}
              </span>

            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {event.status}
            </span>
            <p className="text-gray-600 text-sm mt-2">
              Booked on:{" "}
              {new Date(event.booking_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
            <p className="text-gray-600 text-lg mt-2">
              Tickets Booked: {event.tickets_booked}
            </p>

          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-[#1A73E8] font-bold text-xl">₹{event.price * event.tickets_booked * 1.02}</span>
          <div className="space-x-3">
            <button
              onClick={() => onViewTicket(event)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              View Ticket
            </button>
            <button
              onClick={() => onCancel(event.id)}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition-colors duration-300">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyEvents = () => {
  const navigate = useNavigate();
  const [bookedEvents, setBookedEvents] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };


  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/booked-events", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch booked events");
        }

        const data = await response.json();
        setBookedEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching booked events:", error);
      }
    };

    fetchBookedEvents();
  }, []);



  const handleCancelBooking = async (bookingId) => {
    toast.dismiss();

    const toastId = toast.info(
      <div>
        <p>Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              confirmCancel(bookingId);
            }}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss(toastId)} className="bg-gray-300 px-4 py-1 rounded">No</button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );
  };

  const confirmCancel = async (bookingId) => {

    try {
      const response = await fetch("http://localhost:5000/cancel-booking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ bookingId }),
      });

      const text = await response.text();

      if (!response.ok) {
        console.log("Server response:", text);
        throw new Error("Failed to cancel booking.");
      }

      setBookedEvents(prevEvents => prevEvents.filter(event => event.id !== bookingId));
      toast.success("Booking cancelled successfully.");
    } catch (error) {
      console.error("Cancel failed:", error);
      console.error("Cancel failed:", error);

      toast.error("Failed to cancel booking.");
    }
  };



  return (
    <div className="min-h-screen bg-[#F5F5F5] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center space-x-4">

          <button
            onClick={() => navigate('/customer')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
            <p className="text-gray-600 mt-2">Manage events and tickets</p>
          </div>
        </div>

        <div className="space-y-6">
          {bookedEvents.length > 0 ? (
            bookedEvents.map(event => (
              <BookedEventCard key={event.id} event={event} onViewTicket={handleViewTicket} onCancel={handleCancelBooking} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-900">No events booked yet</h3>
              <p className="text-gray-600 mt-2">Browse and book events to see them here</p>
            </div>
          )}
        </div>
      </div>


      {selectedTicket && (
        <TicketDetailsPopup
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}


    </div>
  );
};

export default MyEvents;