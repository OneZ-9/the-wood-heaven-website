"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ++++++++++++++++ GUEST-PROFILE ++++++++++++++++++++++++++++

export async function updateGuestProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perform this action");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Check the national ID is between 6-12 chars alphanumeric
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  // If no errors with data, prepare an object of updated data to send to DB
  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  // update the data into DB
  const guestId = session.user.guestId;
  const updatedProfile = await updateGuest(guestId, updateData);

  revalidatePath("/account/profile");
}

// ++++++++++++++++ RESERVATIONS ++++++++++++++++++++++++++++
export async function createReservation(newBookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perform this action");

  // if we have number of data from the formData, instead using formData.get() we can use,
  // creates an object with all the data which is in  formData
  // Object.entries(formData.entries());

  const newBooking = {
    ...newBookingData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: newBookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const createdBooking = await createBooking(newBooking);

  revalidatePath(`/cabins/${newBookingData.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perform this action");

  // 2) Authorization
  // Check if the user going to delete own reservation or not
  const bookingsByGuest = await getBookings(session.user.guestId);
  const guestBookingIds = bookingsByGuest.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You're not allowed to update this booking");

  // 3) Prepare data to be updated
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //4) Mutation
  const updatedReservation = await updateBooking(bookingId, updateData);

  // 6) Revalidation and redirecting
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to perform this action");

  // Check if the user going to delete own reservation or not
  const bookingsByGuest = await getBookings(session.user.guestId);
  const guestBookingIds = bookingsByGuest.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You're not allowed to delete this booking");

  const deletedReservation = await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

// ++++++++++++++++ AUTHENTICATION ++++++++++++++++++++++++++++

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAtion() {
  await signOut({ redirectTo: "/" });
}
