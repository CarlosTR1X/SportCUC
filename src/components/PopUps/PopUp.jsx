import Imagen from "../Image/Image";

export default function PopUp({ onClose, message, status }) {

    return (

        <div className="p-7">
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow">
                    <button onClick={onClose} className="ml-48"><Imagen className={'mx-auto hover:animate-spin'} path={"/svg/close.svg"} width={25} height={25} /></button>
                    {status ? (
                        <Imagen className={'mx-auto'} path={"/gifs/ok.gif"} width={180} height={180} />
                    ) : (
                        <Imagen className={'mx-auto'} path={"/gifs/error.gif"} width={180} height={180} />
                    )}
                    <div className="bg-basePurple/20 border-t m-1 mb-4 divide-black" >
                    </div>
                    {status ? (
                        <p className="text-green-500 text-sm text-center mb-4">{message}</p>
                    ) : (
                        <p className="text-red-500 text-sm text-center mb-4">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}