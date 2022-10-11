
# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.
The difference is that PureComponent does a shallow comparison of the state change, so a way to break the app is to have a nested state. In case you update it, the changes will not be reflected in the UI and it's children won't re-render too, so you must have only PureComponents as children of Components

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
ShouldComponentUpdate changes the way React updates so if you have implemented a shouldComponentUpdate and this Component is not interested in the context change, it might block the context propagation 

## 3. Describe 3 ways to pass information from a component to its PARENT.
- You can pass a function as a prop to the Children, when you call the function and pass some data as arguments. When the function is called, the Parent will have that information
- Use Context API to update the data on the Child and the Parent will access that data
- 
## 4. Give 2 ways to prevent components from re-rendering.
- Usage of React.memo and shouldComponentUpdate
- Usage of hooks as useMemo and useCallback. Not only prevents re-render but optimizes the load in the application
- 
## 5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragment is a "fake" elements that allows you to add multiple element without adding a wrapper element in the DOM, because React only allows one root element on a Component. It might break your app in a visual way if you're not aware of the bigger picture of the html, specially if you are returning the Fragment in a reusable Component.

## 6. Give 3 examples of the HOC pattern.
 HOCs are Components that receive Components as props. You can see it in old version of react-intl, react Router and usually on old Systems Designs Providers.
 
## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
- Callbacks are functions as parameters of functions. As soon as the first functions is finished it will run the callback function. The problem is that it creates what we call a callback hell, making the code hard to read, and we have the Promises to fix it.
- A Promise is used to change the way Javascript work (it is synchronous by default) and make a piece of code wait for the completion of an asyncronous request. The problem is that it somewhat creates the same problem as the callback functions, called Chaining.
- Async/Await are a more clean way to use Promises, this way you add async keyword when returning a Promise and await when calling a Promise (you can't use in a global level), and can use try/catch block to handle errors in Promises, making the syntax much clearer.
- 
## 8. How many arguments does setState take and why is it async.
It takes up to two. The first is an object or function used to update the state. The second is a callback function ran after the first function is ended. setState is asynchronous because updating the state might be really expensive and the browser could be unresposive, making the user experience terrible.

## 9. List the steps needed to migrate a Class to Function Component.
- Change from Class to Function keyword
- Remove render function
- change methods to functions and use React hooks wherever we have states

## 10. List a few ways styles can be used with components.
- You can use styles the same way you would normally, using IDs, classes and and selectors in CSS files
- Use some framework as Styled Components to build Components that have their own separate style since CSS file will render altogether in a single CSS file in CSS
- Create expansible Components in a System Design as a separate project and use this project in other Projects.
- 
## 11. How to render an HTML string coming from the server.
Every element in React has a prop called `dangerouslySetInnerHTML`, used to replace the innerHTML in the DOM. you just pass you html string in this prop as part of an object like `{__html: myHTMLString}` and React renders it as a children of the element you used that prop
