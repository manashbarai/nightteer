import React, { useState } from 'react'
import MyUser from './MyUser'
import VipUser from './VipUser'

const User = () => {

    const [userType, setUserType] = useState("my_user")


    return (

        <div className=' flex flex-col gap-5 px-28 my-5'   >
            <div className=' flex gap-4 border-b pb-5 '>
            <button className='px-7 py-2 bg-sky-50 text-zinc-700 font-semibold rounded border active:scale-105 ' onClick={() => setUserType('my_user')} > My User  </button>
            <button className='px-7 py-2 bg-sky-50 text-zinc-700 font-semibold rounded border active:scale-105 ' onClick={() => setUserType('vip_user')} > Vip User  </button>


            </div>

            {userType === 'my_user' && <MyUser />}
            {userType === 'vip_user' && <VipUser />}

        </div>

    )



}

export default User
