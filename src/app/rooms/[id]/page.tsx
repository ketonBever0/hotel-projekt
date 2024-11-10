import axios from "axios";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const queryId = parseInt((await params).id);

    const roomType = (await axios.get(`${process.env.appHost}/api/roomtype/${queryId}`));

    return (
        <div>

        </div>
    );
}