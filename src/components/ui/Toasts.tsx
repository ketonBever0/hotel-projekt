import toast from "react-hot-toast"


export const tSuccess = (str: string) => {
    toast.success(str, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }
    }
    );
}

export const tError = (str: string) => {
    toast.error(str, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }
    }
    );
}

export const tPromise = (promise: Promise<void>, loadStr: string, successStr: string, errStr: string) => {
    toast.promise(promise, {
        loading: loadStr,
        success: successStr,
        error: errStr
    })
}