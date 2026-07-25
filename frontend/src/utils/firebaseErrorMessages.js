export const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please log in instead.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password must be at least 6 characters long.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    default:
      return "Something went wrong. Please try again.";
  }
};