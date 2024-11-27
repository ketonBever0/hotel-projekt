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
    acceptedBy: number
}

type OneReservationType = {
    id: number,
    startDate: string,
    endDate: string,
    roomNumber: string,
    price: number | null
}

type ReservationStatType = {
    name: string,
    quantity: number,
    maxPrice: number,
    averagePrice: number
}