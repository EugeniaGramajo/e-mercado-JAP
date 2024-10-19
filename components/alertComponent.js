export const alertComponent = ({ title, text, icon, redirect }) => {
  if (redirect) {
    Swal.fire({
      title,
      text,
      icon,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = redirect;
      }
    });
  } else {
    Swal.fire({
      title,
      text,
      icon,
    });
  }
};
