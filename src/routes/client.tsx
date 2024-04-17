import { useState } from "react";
import { useAuth } from "../App";
import { addReservation, cancelReservation, getAvailableSlots, getClient } from "../data";
import { List, ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton } from "@mui/material";

export default function ClientPage() {
  const auth = useAuth()
  const [clientReservations, setClientReservations] = useState(getClient(auth.user)?.reservations)
  const [slots, setSlots] = useState<Date[]>(getAvailableSlots())
  const [showConfirmPopup, setShowConfirmPopup] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Date>()

  const handleReservation = (slot: Date) => {
    setShowConfirmPopup(true)
    setSelectedSlot(slot)
    addReservation(slot, auth.user)
  }

  const closeConfirmPopup = () => {
    setShowConfirmPopup(false)
    if (selectedSlot) {
      cancelReservation(selectedSlot, auth.user)
      setSlots(getAvailableSlots())
    }
  }

  const handleConfirmation = () => {
    setShowConfirmPopup(false)
    if (selectedSlot) {
      setSlots(getAvailableSlots())
      setClientReservations(getClient(auth.user)?.reservations)
    }
  }

  return (
    <>
      <h3>Client Page</h3>
      {clientReservations && clientReservations.length > 0 && (
        <>
          <h4>Reservations</h4>
          <List>
          {clientReservations.map(bookedSlot => {
            return <ListItem>{bookedSlot.toLocaleString()}</ListItem>
          })}
          </List>
        </>
      )}
      <h4>Available slots</h4>
      {!!slots && (
        <>
          <div>
            To reserve an appointment, please select an available slot below.
            Each slot is a 15 minute appointment with a provider.
          </div>
          <List sx={{ width: ['100%', '20%']}}>
            {slots.map(slot => {
              return <ListItemButton divider onClick={() => handleReservation(slot)}>{slot.toLocaleString()}</ListItemButton>
            })}
          </List>
        </>
      )}
      <Dialog
        open={showConfirmPopup}
        onClose={closeConfirmPopup}
      >
        <DialogTitle>
          Confirm reservation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm your reservation for {selectedSlot?.toLocaleString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmPopup}>Cancel</Button>
          <Button onClick={handleConfirmation} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
