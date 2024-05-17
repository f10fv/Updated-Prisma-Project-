
import UserProfile from "@/app/components/userProfile";
export default function Page({ params }) {
    const id = params.id
    console.log("ID", id);
    return (
        <UserProfile id={params.id}/>
  );
}