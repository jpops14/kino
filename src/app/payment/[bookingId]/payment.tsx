'use client'

import { Box, Typography, Paper, Alert, Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "@/app/_lib/paypal/paypal";
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { confirmBookingPayment } from "@/app/_lib/booking/actions";
import { useRouter } from "next/navigation";

const Payment = ({ bookingData }: { bookingData: {
    id: number;
    payment_expires: Date;
    total: number;
    user_id: number;
    seats_count: number;
    screening: {
        id: number;
        start: Date;
        movie: {
            title: string;
        };
    };
} }) => {
    const [state, setState] = useState<{ error?: string }>({});
    const router = useRouter()


    const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'EUR',
                        value: bookingData.total?.toFixed(2),
                    }
                },
            ],
            intent: 'CAPTURE',
        });
    }

    const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
        return actions?.order?.capture().then((details) => {
            return confirmBookingPayment(bookingData.id, details.id!);
        }).then((result) => setState(result));
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
        <Box sx={{display: 'flex', p: 2, flexDirection: 'column', justifyContent: 'start', alignItems: 'center', minHeight: '100vh', backgroundColor: ''}}>
            <Paper sx={{ p: 3, maxWidth: 600, width: '100%', textAlign: 'center' }}>
                <Typography sx={{ mb: 2 }} variant='h4'> Pay for your booking to confirm it </Typography>
                <Typography variant='h5'> &quot;{bookingData.screening.movie.title}&quot; - {dayjs(bookingData.screening.start).format('DD.MM.YYYY HH:mm')} </Typography>
                <Typography variant='h6'> Seats: {bookingData.seats_count} </Typography>
                <Typography variant='h6' sx={{ mb: 2}}> Total: {bookingData.total} EUR </Typography>
                {state?.error ? (
                    <Alert severity="error" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}> 
                        <Typography variant='h6'> An error occurred has occurred while processing the payment: </Typography>
                        <Typography variant='h6'> {state.error} </Typography>
                        <Button sx={{ my: 2, mx: 'auto' }} variant="contained" onClick={() => router.push('/bookings')}> Return to bookings </Button>
                    </Alert>
                ) : (
                    <PayPalButtons 
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                )}
            </Paper>

        </Box>
        </PayPalScriptProvider>
    )
}

export default Payment;