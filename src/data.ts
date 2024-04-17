export type Client = {
  id: number
  name: string
  reservations: Date[]
}

/**
 * Fake test data for clients
 * @type {Client[]}
 */
let clients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    reservations: [],
  },
  {
    id: 2,
    name: "Jane Adams",
    reservations: [new Date("2024-04-22T10:00:00")],
  },
  {
    id: 3,
    name: "Kevin James",
    reservations: [],
  },
  {
    id: 4,
    name: "Grace Turner",
    reservations: [],
  },
  {
    id: 5,
    name: "Sara Jones",
    reservations: [],
  },
];

// Fake test available slots
let availableSlots: Date[] = [
  new Date("2024-04-18T11:00:00"),
  new Date("2024-04-21T10:00:00"),
  new Date("2024-04-21T10:15:00"),
  new Date("2024-04-21T10:30:00"),
  new Date("2024-04-21T10:45:00"),
  new Date("2024-04-21T11:00:00"),
  new Date("2024-04-22T09:45:00"),
  new Date("2024-04-22T10:15:00"),
  new Date("2024-04-22T11:00:00"),
  new Date("2024-04-22T12:00:00"),
  new Date("2024-04-22T12:30:00")
]

export function getClients() {
  return clients;
}

/**
 * @param {number} id
 * @returns {Client}
 */
export function getClient(id: number) {
  return clients.find((client) => client.id === id);
}

/**
 * Add reservation would call an API to remove the availability slot
 * Current implementation mimics API of updating available slots and
 * client reservations.
 * @param {Date} reservationDate
 * @param {number} id
 * @returns {Date}
 */
export function addReservation(reservationDate: Date, id: number) {
  clients = clients.map(client => {
    if (client.id === id) {
      availableSlots = availableSlots.filter((slot) => slot !== reservationDate)
      return {...client, reservations: [...client.reservations, reservationDate]}
    }
    return client
  });
}

export function cancelReservation(reservationDate: Date, id: number) {
  let client = clients.find(c => c.id === id)
  if (!!client) {
    const reservations = client.reservations.filter((slot) => slot != reservationDate)
    client.reservations = reservations
    console.log('reservations', client.reservations)
    availableSlots.push(reservationDate)
  }
}

export type Provider = {
  id: number
  name: string
  schedule: ProviderSchedule[]
}

export type ProviderSchedule = {
  id: number
  providerId: number
  start: Date
  end: Date
}

/**
 * Fake test data for providers
 * @type {Provider[]}
 */
let providers: Provider[] = [
  {
    id: 11,
    name: "Phil Butler",
    schedule: []
  },
  {
    id: 12,
    name: "Joan McLean",
    schedule: []
  },
  {
    id: 13,
    name: "Richard Blake",
    schedule: []
  },
  {
    id: 14,
    name: "Scott Lee",
    schedule: []
  },
  {
    id: 15,
    name: "Julia Grant",
    schedule: []
  },
];

export function getProviders() {
  return providers;
}

/**
 * @param {number} id
 * @returns {Provider}
 */
export function getProvider(id: number) {
  return providers.find((provider) => provider.id === id);
}

// Call API to add provider available slot.
// Assume API will add the provider availability to the availability slots.
export function addProviderAvailableSlot(startTime: Date, endTime: Date, id: number) {
  return
}

// Mock API data that backend will return.
// Returns slots that are at least 24 hours after the current date.
export function getAvailableSlots() {
  const tomorrow = new Date(Date.now() + (3600 * 1000 * 24))
  return availableSlots.filter((slot) => slot > tomorrow).sort(
    (a, b) => {return a.getTime() - b.getTime()}
  )
}