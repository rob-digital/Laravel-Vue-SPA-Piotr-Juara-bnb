<?php

namespace App\Http\Controllers\Api;

use App\Address;
use App\Bookable;
use App\Booking;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'bookings' => 'required|array|min:1',

            'bookings.*.bookable_id' => 'required|exists:bookables,id',          // must exist as a column 'id' in the bookables table
            'bookings.*.from'        => 'required|date|after:today',             // or now instead of today
            'bookings.*.to'          => 'required|date|after:bookings.*.from',
            'customer.first_name'    => 'required|min:2',
            'customer.last_name'     => 'required|min:2',
            'customer.email'         => 'required|email',
            'customer.street'        => 'required|min:2',
            'customer.city'          => 'required|min:2',
            'customer.country'       => 'required|min:2',
            'customer.post_code'     => 'required|min:2',
        ]);

        $data = array_merge($data, $request->validate([
            'bookings.*' => ['required', function($attribute, $value, $fail){
                $bookable = Bookable::findOrFail($value['bookable_id']);

                if(!$bookable->availableFor($value['from'], $value['to'])) {
                    $fail("The object is not available in given dates");
                }
            }]
        ]));

        $bookingsData = $data['bookings'];
        $addressData = $data['customer'];

        $bookings = collect($bookingsData)->map(function ($bookingData) use ($addressData){

            $bookable = Bookable::findOrFail($bookingData['bookable_id']);
            $booking = new Booking();

            $booking->from = $bookingData['from'];
            $booking->to = $bookingData['to'];
            $booking->price = $bookable->priceFor($booking->from, $booking->to)['total'];
            // $booking->bookable_id = $bookingData['bookable_id'];
            $booking->bookable()->associate($bookable);
            $booking->address()->associate(Address::create($addressData));

            $booking->save();
            return $booking;
        });
        return $bookings;
    }
}
