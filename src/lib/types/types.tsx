type RoomTypeType = {
    id: number,
    name: string,
    bedrooms: number,
    singleBeds: number,
    doubleBeds: number,
    babyBeds: number,
    dailyPrice: number,
    description: string,
    roomCount: number
}

type UserType = {
    id: number;
    username: string;
    email: string;
    fullname: string;
    role: string;
    enrolledBy: string | null;
}

type CustomerType = {
    id: number,
    fullname: string,
    email: string,
    mobile: string,
    isBanned: boolean,
    acceptedBy: string | null,
}

type ReservationType = {
    id: number,
    requestedAt: string,
    startDate: string,
    endDate: string,
    roomId: number,
    roomNumber: string,
    customerId: number,
    email: string,
    fullname: string,
    mobile: string,
    isBanned: boolean,
    acceptedBy: number,
    price: number | null
}

type DoneReservationType = {
    id: number,
    startDate: string,
    endDate: string,
    roomNumber: string,
    price: number | null,
    isAccepted: boolean
}

type ReservationStatType = {
    name: string,
    quantity: number,
    maxPrice: number,
    averagePrice: number
}