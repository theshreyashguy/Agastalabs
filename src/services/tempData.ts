export type Guardian = {
  Name: string;
  profilePicture: string;
  Mobile: number;
  Email: string;
};

export type Student = {
  name: string;
  profilepicture: string;
  registrationnumber: string;
  parentdetails: Guardian;
  class: string[];
  age: number;
  mobile: number;
  email: string;
  DOB: string;
  checked: boolean;
  expanded: boolean ;
};

const students: Student[] = [
  {
    name: "JohnDoe",
    profilepicture: "https://randomuser.me/api/portraits/men/1.jpg",
    registrationnumber: "STU12345",
    parentdetails: {
      Name: "Jane Doe",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
      Mobile: 9876543210,
      Email: "janedoe@example.com",
    },
    class: ["10th", "Maths", "Biology", "Chemistry"],
    age: 15,
    mobile: 9123456789,
    email: "johndoe@example.com",
    DOB: "2009-05-15",
    checked: false,
    expanded: false,
  },
  {
    name: "AliceSmith",
    profilepicture: "https://randomuser.me/api/portraits/women/2.jpg",
    registrationnumber: "STU12346",
    parentdetails: {
      Name: "Robert Smith",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
      Mobile: 9123456780,
      Email: "robertsmith@example.com",
    },
    class: ["9th", "Physics", "History", "English"],
    age: 14,
    mobile: 9876543201,
    email: "alicesmith@example.com",
    DOB: "2010-03-10",
    checked: false,
    expanded: true,
  },
  {
    name: "MichaelBrown",
    profilepicture: "https://randomuser.me/api/portraits/men/3.jpg",
    registrationnumber: "STU112347",
    parentdetails: {
      Name: "Emily Brown",
      profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
      Mobile: 9812345678,
      Email: "emilybrown@example.com",
    },
    class: ["11th", "Maths", "Physics", "Computer Science"],
    age: 16,
    mobile: 9812345679,
    email: "michaelbrown@example.com",
    DOB: "2008-11-20",
    checked: false,
    expanded: true,
  },
  {
    name: "SophiaJohnson",
    profilepicture: "https://randomuser.me/api/portraits/women/4.jpg",
    registrationnumber: "STU1254348",
    parentdetails: {
      Name: "Mark Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
      Mobile: 9001234567,
      Email: "markjohnson@example.com",
    },
    class: ["8th", "Maths", "Geography", "Science"],
    age: 13,
    mobile: 9123456710,
    email: "sophiajohnson@example.com",
    DOB: "2011-07-22",
    checked: false,
    expanded: false,
  },
  {
    name: "DavidTaylor",
    profilepicture: "https://randomuser.me/api/portraits/men/5.jpg",
    registrationnumber: "STU123364349",
    parentdetails: {
      Name: "Laura Taylor",
      profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
      Mobile: 9541236543,
      Email: "laurataylor@example.com",
    },
    class: ["12th", "Chemistry", "Maths", "Physics"],
    age: 17,
    mobile: 9812346780,
    email: "davidtaylor@example.com",
    DOB: "2007-02-11",
    checked: false,
    expanded: false,
  },
  {
    name: "EmmaWilson",
    profilepicture: "https://randomuser.me/api/portraits/women/6.jpg",
    registrationnumber: "STU12350",
    parentdetails: {
      Name: "Henry Wilson",
      profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
      Mobile: 9786543120,
      Email: "henrywilson@example.com",
    },
    class: ["10th", "Biology", "Maths", "English"],
    age: 15,
    mobile: 9123456720,
    email: "emmawilson@example.com",
    DOB: "2009-10-25",
    checked: false,
    expanded: true,
  },
  {
    name: "ScarlettJohanson",
    profilepicture: "https://randomuser.me/api/portraits/women/4.jpg",
    registrationnumber: "STU12348",
    parentdetails: {
      Name: "Mark Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
      Mobile: 9001234567,
      Email: "markjohnson@example.com",
    },
    class: ["8th", "Maths", "Geography", "Science"],
    age: 13,
    mobile: 9123456710,
    email: "sophiajohnson@example.com",
    DOB: "2011-07-22",
    checked: false,
    expanded: false,
  },
  {
    name: "TravisHead",
    profilepicture: "https://randomuser.me/api/portraits/men/5.jpg",
    registrationnumber: "STU12349",
    parentdetails: {
      Name: "Laura Taylor",
      profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
      Mobile: 9541236543,
      Email: "laurataylor@example.com",
    },
    class: ["12th", "Chemistry", "Maths", "Physics"],
    age: 17,
    mobile: 9812346780,
    email: "davidtaylor@example.com",
    DOB: "2007-02-11",
    checked: false,
    expanded: false,
  },
];

export default students;

