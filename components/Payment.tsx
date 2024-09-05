import { View, Text, Alert } from "react-native"
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";

const Payment = ({
    fullName,
    email,
    amount,
    driverId,
    rideTime,
}) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [success, setSuccess] = useState(false)

    const confirmHandler = async (paymentMethod, intentCreationCallback) => {
        const { paymentIntent, customer} = await fetchAPI('/(api)/(stripe)/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email: email,
                amount: amount,
                paymentMethodId: paymentMethod.id,
            })
        })

        if(paymentIntent.client_secret) {
            const { result } = await fetchAPI('/(api)/(stripe)/(pay)', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payment_method_id: paymentMethod.id,
                    payment_intent_id: paymentIntent.id,
                    customer_id: customer,
                }),
            });
        }

        if(result.client_secret) {
            
        }

    const { clientSecret, error } = await response.json();
        if (clientSecret) {
          intentCreationCallback({clientSecret})
        } else {
          intentCreationCallback({error})
        }
      }

    const initializePaymentSheet = async () => {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        intentConfiguration: {
          mode: {
            amount: 1099,
            currencyCode: 'USD',
          },
          confirmHandler: confirmHandler
        }
      });
      if (error) {
        // handle error
      }
    };
  

    const openPaymentSheet = async () => {
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        setSuccess(true)
      }
    } 
    };
    
    return (
        <>
            <CustomButton 
                title="Confirm Ride"
                className="my-10"
                onPress={openPaymentSheet}
            />
        </>
    )
}

export default Payment;