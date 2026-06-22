# Design log

We grade the *thinking*, not the length. Short, honest answers beat padding.
Write these as you build, not at the end.

---

## 1. The role check: which option did you pick?

In step 4 you chose between checking the role inside the admin page (Option A) or
teaching `ProtectedRoute` a `requiredRole` prop (Option B). Which one did you
pick, and why? What would make you switch to the other one?

I picked Option B: `ProtectedRoute` accepts a `requiredRole` prop. I liked that
because the "must be signed in, and optionally must have this role" rule now
lives in one wrapper instead of being rewritten on every admin-style page. I
would switch to Option A if only one page ever needed role logic or if each page
needed a very custom denial flow.

## 2. The flash problem

There is a moment when the page first loads where the user *looks* logged out
even though they have a valid session cookie. Where does that moment come from, and what
in your `ProtectedRoute` prevents the user from seeing the wrong thing during it?
(Mention both the spinner and the `return null`.)

That moment comes from the first `/me` request. The browser may have a valid
httpOnly cookie, but React does not know who the user is until the auth context
finishes asking the backend. `ProtectedRoute` shows a spinner while `loading` is
true, then returns `null` during the redirect for unauthenticated users, so the
protected children never flash on screen.

## 3. Gating the delete button

How did you decide whether to show the delete button? Where does that decision
live, and what does a normal `USER` actually see in the markup?

The posts page reads `user` from `useAuth()` and sets `isAdmin` from
`user?.role === "ADMIN"`. The delete button is rendered only inside that check.
A normal `USER` gets the same post cards, but the delete button is not in the
markup at all.

## 4. The navbar in each state

Describe what the navbar renders in each of these cases: logged out, logged in as
a `USER`, logged in as an `ADMIN`. What single value drives the difference?

Logged out users see the public links and a Login button. A logged-in `USER`
sees the public links, their name, `USER`, and a Sign Out button. A logged-in
`ADMIN` sees the same navbar shape, but the role label says `ADMIN`. The single
value driving the difference is the current `user` from auth context.

## 5. If I had another hour

What would you add or clean up next? (Redirect after login, active link
highlighting, real delete against a backend, nicer access-denied page...)

I would add redirect-after-login next, so someone bounced from `/admin` lands
back on `/admin` after signing in. After that I would highlight the active nav
link and move fake deletes to a real backend endpoint once posts belong to our
own API.
