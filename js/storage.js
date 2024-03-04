document.addEventListener('DOMContentLoaded', function () {

    // Get Seat
    const seat = document.querySelectorAll('.seat');

    seat.forEach((Seat)=>{
        Seat.addEventListener("click", function(){
            const seatId = Seat.getAttribute("id");
            console.log('seat selected: ' + seatId);
           localStorage.setItem('Seat', seatId);

           updateSeat()

        })
    });

    // Update Seat

    function updateSeat(){
        const displaySeat = document.getElementById("PaymentSeat");
 
        const seatName = localStorage.getItem("Seat");
 
        displaySeat.innerHTML = seatName;

    }





    // Get Ticket

        // Get Seat
        const ticket = document.querySelectorAll('.ticket-price');

        ticket.forEach((Ticket)=>{
            Ticket.addEventListener("click", function(){
                const TicketId = Ticket.getAttribute("id");
                console.log('Ticket selected: ' + TicketId);
               localStorage.setItem('TicketPrice', TicketId);
    
               updateticket()
    
            })
        });
    
        // Update ticket
    
        function updateticket(){
            const displayPrice = document.getElementById("ticketPrice");
            const payablePrice = document.getElementById("payablePrice");
     
            const ticketPrice = localStorage.getItem("TicketPrice");
     
            displayPrice.innerHTML = ticketPrice;
            payablePrice.innerHTML = ticketPrice;
    
        }


});
