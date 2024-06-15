import Swal from "sweetalert2"
import useAxiosSecure from "./useAxiosSecure"

// TODO: take a sing user parameter on useChangeRole() hook have to .map
const useChangeRole = async user => {
    const updateRole = await useAxiosSecure.put(`/users/${user._id}`, {
        role: 'admin',            
    })

    if(updateRole.status === 200){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${user.name} is now Admin`,
            showConfirmButton: false,
            timer: 1500
          })
    }
    return [updateRole]
}

export default useChangeRole;