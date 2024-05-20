import LoginCard from '../../components/LoginCard/LoginCard'
import ModalContainer from '../../components/Modals/ModalContainer'
import SignUpCard from '../../components/signUpCard/SignUpCard'
import { useCtx } from '../../context/context'


export default function AuthModalIndex({ }) {
    const { setModalData, modalData, setAuth, auth } = useCtx()

    return <ModalContainer onClose={() => setModalData({ open: false, modalId: "" })}>
        <div className='w-full max-h-full  transition-all'>
            <div className='flex font-medium border-b pb-5'>
                <button className='mr-5 focus:text-blue-500' onClick={() => setModalData({ open: true, modalId: "LOGIN" })}>Login</button>
                <button className='focus:text-blue-500' onClick={() => setModalData({ open: true, modalId: "SIGNUP" })}>Sign Up</button>
            </div>
            {
                modalData?.modalId === "LOGIN" && <LoginCard />
            }
            {
                modalData?.modalId === "SIGNUP" && <SignUpCard />
            }
        </div>
    </ModalContainer>
}