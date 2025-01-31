const userProfiles = [
    {
        id: 1,
        username: "string",
        dateJoined:"date one",
    fullName: "example one",
    email: "example@email.com",
    country: "example country",
    bio: "string example",

},

{
    id: 2,
    username: "string",
    dateJoined:"date one",
fullName: "example one",
email: "example@email.com",
country: "example country",
bio: "string example",

},
{
    id: 3,
    username: "string",
    dateJoined:"date one",
fullName: "example one",
email: "example@email.com",
country: "example country",
bio: "string example",

}
]

const userSavedCountries = [
    {
        userID: 1,
        savedCountries: "country name, country name, country name",
        flag: "example url, example url, example url",
    },
    {
        userID: 2,
        savedCountries: "country name, country name, country name",
        flag: "example url, example url, example url",
    },
    {
        userID: 3,
        savedCountries: "country name, country name, country name",
        flag: "example url, example url, example url",
    }
]

const userCountryCount = [
    {
        userID: 1,
        countryCount: {
            USA: 5,
            MEX:4,
            JAP: 6,

        }
    },
       {
        userID: 2,
        countryCount: {
            USA: 5,
            MEX:4,
            JAP: 6,

        }
    },
        {
            userID: 3,
        countryCount: {
            USA: 5,
            MEX:4,
            JAP: 6,
        }
        }
    
    
]


const cookies = [
    {
        SKU: "0006",
        name: "white chocolate bites",
        desc: "cookie description",
        price: "$1",
        inventory: 5,

    },
    {
        SKU: "0003",
        name: "oatmeal bites",
        desc: "cookie description",
        price: "$2",
        inventory: 10,

    },
    {
        SKU: "0001",
        name: "jam and poppyseed bites",
        desc: "cookie description",
        price: "$1",
        inventory: 15,

    }

]

const ordersPlaced= [
    {
        orderNumber: "123",
        cart: [
            {
            SKU: "0006" ,
            quantity: "10",
            },
            {
                SKU: "0001" ,
                quantity: "15",
                },
        ]
    },
    {
        orderNumber: "100",
        cart: [
            {
            SKU: "0006" ,
            quantity: "5",
            },
            {
                SKU: "0001" ,
                quantity: "8",
                },
        ]
    },
    {
        orderNumber: "58",
        cart: [
            {
            SKU: "0006" ,
            quantity: "9",
            },
            {
                SKU: "0001" ,
                quantity: "7",
                },
        ]
    }
]

const customerOrders = [
    {
              
        orderNumber: 1,
        orderDate: "date",
         firstName: "string",
         lastName: "string",
         paymentMethod: "string",
         shippingAddress: { 
        line1: "string",
        line2: "",
        city: "string",
        state: "string",
        zip: "12345",
         }
         
    },
    {
              
        orderNumber: 2,
        orderDate: "date",
         firstName: "string",
         lastName: "string",
         paymentMethod: "string",
         shippingAddress: { 
        line1: "string",
        line2: "",
        city: "string",
        state: "string",
        zip: "12345",
         }
         
    },
    {
              
        orderNumber: 3,
        orderDate: "date",
         firstName: "string",
         lastName: "string",
         paymentMethod: "string",
         shippingAddress: { 
        line1: "string",
        line2: "",
        city: "string",
        state: "string",
        zip: "12345",
         }
         
    }
]


const profileData = {
    name: "Jill Anderson",
    career: "UI Designer",
    purpose: "I'm looking for a site that will simplify the planning of my business trips.",
    age: 26,
    status: "single",
    location: "Brooklyn",
    archetype: "Frequent Flyer",
    Bio: "string",
    Personality: "introvert, creative,loyal,active",
    Goals: ["To spend less time booking travel", "To narrow her options quickly"],
    Motivations: {
        price: "value", 
        comfort: "value",
        convenience: "value",
        speed: "value",
        loyaltyMiles: "value"
    },
    frustrations: [ "Too much time spent booking-she's busy!", "Too many websites visited per trip", "Not terribly tech savvy- doesn't like the process"],
    favoriteBrands: ["Addidas", "Nike", "Netflix", "AirBnB", "Zara"]
}
