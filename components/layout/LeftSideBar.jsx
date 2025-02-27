"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";

import Menu from "./Menu";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import Link from "@node_modules/next/link";

const LeftSideBar = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar">
      <Link href="/">
        <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Link href={`/`}>
            <Image
              src={userData?.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <p className="text-small-bold">
            {userData?.firstName} {userData?.lastName}
          </p>
        </div>
        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.posts?.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.followers?.length}</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.following?.length}</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>
      </div>

      <hr />

      <Menu />

      <hr />

      <div className="flex gap-4 items-center">
        <UserButton
          appearance={{ baseTheme: dark }}
          afterSignOutUrl="/sign-in"
        />
        <p className="text-light-1 text-body-bold">Manage Account</p>
      </div>
    </div>
  );
};

export default LeftSideBar;

// "use client";
// import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
// import { Logout } from "@mui/icons-material";
// import Link from "next/link";
// import Image from "next/image";

// import Menu from "./Menu";

// import { dark } from "@clerk/themes";

// const LeftSideBar = () => {
//   return (
//     <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar">
//       <Link href="/">
//         <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
//       </Link>
//       <div className="flex flex-col gap-2">
//         <div className="flex flex-col gap-2 items-center text-light-1">
//           <Link href="/">
//             <Image
//               src="/assets/phucmai.png"
//               alt="profile photo"
//               width={50}
//               height={50}
//               className="rounded-full"
//             />
//           </Link>
//           <p className="text-small-bold">phuc mai</p>
//         </div>
//         <div className="flex text-light-1 justify-between">
//           <div className="flex flex-col items-center">
//             <p className="text-base-bold">1</p>
//             <p className="text-tiny-medium">Posts</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <p className="text-base-bold">1</p>
//             <p className="text-tiny-medium">Followers</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <p className="text-base-bold">1</p>
//             <p className="text-tiny-medium">Following</p>
//           </div>
//         </div>
//         <hr />

//         <Menu />

//         <hr />
//         <div className="flex gap-4 items-center">
//           <UserButton
//             appearance={{ baseTheme: dark }}
//             afterSignOutUrl="/sign-in"
//           />
//           <p className="text-light-1 text-body-bold">Manage Account</p>
//         </div>
//         <SignedIn>
//           <SignOutButton>
//             <div className="flex cursor-pointer gap-4 items-center">
//               <Logout sx={{ color: "white", fontSize: "32px" }} />
//               <p className="text-light-1 text-body-bold">LogOut</p>
//             </div>
//           </SignOutButton>
//         </SignedIn>
//       </div>
//     </div>
//   );
// };

// export default LeftSideBar;
