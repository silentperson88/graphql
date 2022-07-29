import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "./graphQlQuery/graphqlquery";

function App() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log(error.message);
  }
  return (
    <div className="container">
      {data.quotes.map((quote) => {
        return <h6>{quote.name}</h6>;
      })}
    </div>
  );
}

export default App;

// useEffect(() => {
//   // fetch("http://localhost:4000", {
//   //   method: "post",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     authorization:
//   //       "ravi eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWU5NGIzZDIzY2JlNTVhZDhmNDI0NGIiLCJpYXQiOjE2NDI2OTIwMzZ9.6QyoAtjWkFRN_qllldgupn27u-Y7cMo2kX93tdgCRmo",
//   //   },
//   //   body: JSON.stringify({
//   //     query: `query getAllUsers{
//   //     users{
//   //       _id
//   //       lastName
//   //       firstName
//   //       email
//   //       quotes{
//   //         name
//   //       }
//   //     }
//   //   }`,
//   //   }),
//   // })
//   //   .then((res) => res.json())
//   //   .then((data) => console.log(data));
//   const graphqlQuery = {
//     query: `query getAllUsers{
//           users{
//             _id
//             lastName
//             firstName
//             email
//             quotes{
//               name
//             }
//           }
//         }`,
//   };
//   axios({
//     url: "http://localhost:4000",
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       authorization:
//         "ravi eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWU5NGIzZDIzY2JlNTVhZDhmNDI0NGIiLCJpYXQiOjE2NDI2OTIwMzZ9.6QyoAtjWkFRN_qllldgupn27u-Y7cMo2kX93tdgCRmo",
//     },
//     data: graphqlQuery,
//   })
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
// });
