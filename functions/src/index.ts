import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const addBookToUser = functions.firestore
  .document("users/{userId}/books/{bookId}")
  .onCreate((snapshot, context) => {
    const bookData = snapshot.data();
    const {userId, bookId} = context.params;
    return admin.firestore().collection("users").doc(userId).update({
      bookIds: admin.firestore.FieldValue.arrayUnion(bookId),
      bookTitles: admin.firestore.FieldValue.arrayUnion(bookData.title),
    });
  });

export const updateBookTitle = functions.firestore
  .document("users/{userId}/books/{bookId}")
  .onUpdate((change, context) => {
    const {userId} = context.params;
    const newUserDoc = change.after.data();
    const oldUserDoc = change.before.data();

    if (newUserDoc.title === oldUserDoc.title) {
      return null; // Exit if title hasn't changed
    }

    return admin.firestore().collection("users").doc(userId).get()
      .then((userDoc) => {
        if (!userDoc.exists) {
          throw new Error("User not found");
        }

        const userData = userDoc.data();
        const bookTitles = userData?.bookTitles || [];
        const titleIndex = bookTitles.indexOf(oldUserDoc.title);

        if (titleIndex !== -1) {
          bookTitles[titleIndex] = newUserDoc.title;
        }

        return userDoc.ref.update({bookTitles});
      });
  });

export const addChapterToBook = functions.firestore
  .document("users/{userId}/books/{bookId}/chapters/{chapterId}")
  .onCreate((snapshot, context) => {
    const chapterData = snapshot.data();
    const {userId, bookId, chapterId} = context.params;

    return admin.firestore().collection("users").doc(userId)
      .collection("books").doc(bookId).update({
        chapterIds: admin.firestore.FieldValue.arrayUnion(chapterId),
        chapterTitles: admin.firestore.FieldValue.arrayUnion(chapterData.title),
      });
  });

export const updateChapterTitle = functions.firestore
  .document("users/{userId}/books/{bookId}/chapters/{chapterId}")
  .onUpdate((change, context) => {
    const {userId, bookId} = context.params;
    const newChapterDoc = change.after.data();
    const oldChapterDoc = change.before.data();

    if (newChapterDoc.title === oldChapterDoc.title) {
      return null; // Exit if title hasn't changed
    }

    return admin.firestore().collection("users").doc(userId)
      .collection("books").doc(bookId).get()
      .then((bookDoc) => {
        if (!bookDoc.exists) {
          throw new Error("Book not found");
        }

        const bookData = bookDoc.data();
        const chapterTitles = bookData?.chapterTitles || [];
        const titleIndex = chapterTitles.indexOf(oldChapterDoc.title);

        if (titleIndex !== -1) {
          chapterTitles[titleIndex] = newChapterDoc.title;
        }

        return bookDoc.ref.update({chapterTitles});
      });
  });

export const createUser = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    bookIds: [],
    bookTitles: [],
  });
});
