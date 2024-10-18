export const alertComponent = ({title, text, icon, redirect})=>{
    Swal.fire({
        title,
        text,
        icon,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = redirect; 
        }
      });
}