type UserType = {
    id: number;
    username: string;
    email: string;
    fullname: string;
    role: string;
    enrolledBy: string | null;
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