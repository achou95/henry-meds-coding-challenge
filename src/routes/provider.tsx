import { useState } from "react";
import { useAuth } from "../App";
import { addProviderAvailableSlot } from "../data";
import { Button, Stack, TextField } from "@mui/material";

export default function ProviderPage() {
  const auth = useAuth()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")

  const handleAddTime = () => {
    const startDateTime = `${selectedDate} ${startTime}`
    const endDateTime = `${selectedDate} ${endTime}`
    addProviderAvailableSlot(new Date(startDateTime), new Date(endDateTime), auth.user)
    setSelectedDate("")
    setStartTime("")
    setEndTime("")
  }

  return (
    <>
      <h3>Provider Page</h3>
      <h4>Add available times</h4>
      <Stack component="form" spacing={1}>
        <label>Date</label>
        <TextField
          id="Date"
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)} 
        />
        <label>Start time</label>
        <TextField
          id="Start time"
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)} 
        />
        <label>End time</label>
        <TextField
          id="End time"
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
      </Stack>
      <Button variant="outlined" onClick={handleAddTime} sx={{ mt: 2}}>Add time</Button>
    </>
  )
}