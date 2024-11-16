import { ApexOptions } from 'apexcharts';
import {
  AttendanceStatus,
  ButtonData,
  FilterByStatus,
  LeaveRecordType,
} from './type';
import { AttendanceData } from './type';
import IconUser from '../components/Icon/IconUser';
import IconCardList from '../components/Icon/IconCardList';
import IconBank from '../components/Icon/IconBank';
import IconTelephone from '../components/Icon/IconTelephone';
import IconFileEarmarkFill from '../components/Icon/IconFileEarmarkFill';
import IconBell from '../components/Icon/IconBell';
import IconActivity from '../components/Icon/Icon Activity';

const isDark = true;

export const rowData = [
  {
    id: 1,
    firstName: 'Caroline',
    lastName: 'Jensen',
    email: 'carolinejensen@zidant.com',
    dob: '2004-05-28',
    address: {
      street: '529 Scholes Street',
      city: 'Temperanceville',
      zipcode: 5235,
      geo: {
        lat: 23.806115,
        lng: 164.677197,
      },
    },
    phone: '+1 (821) 447-3782',
    isActive: true,
    age: 39,
    company: 'POLARAX',
  },
  {
    id: 2,
    firstName: 'Celeste',
    lastName: 'Grant',
    email: 'celestegrant@polarax.com',
    dob: '1989-11-19',
    address: {
      street: '639 Kimball Street',
      city: 'Bascom',
      zipcode: 8907,
      geo: {
        lat: 65.954483,
        lng: 98.906478,
      },
    },
    phone: '+1 (838) 515-3408',
    isActive: false,
    age: 32,
    company: 'MANGLO',
  },
  {
    id: 3,
    firstName: 'Tillman',
    lastName: 'Forbes',
    email: 'tillmanforbes@manglo.com',
    dob: '2016-09-05',
    address: {
      street: '240 Vandalia Avenue',
      city: 'Thynedale',
      zipcode: 8994,
      geo: {
        lat: -34.949388,
        lng: -82.958111,
      },
    },
    phone: '+1 (969) 496-2892',
    isActive: false,
    age: 26,
    company: 'APPLIDECK',
  },
  {
    id: 4,
    firstName: 'Daisy',
    lastName: 'Whitley',
    email: 'daisywhitley@applideck.com',
    dob: '1987-03-23',
    address: {
      street: '350 Pleasant Place',
      city: 'Idledale',
      zipcode: 9369,
      geo: {
        lat: -54.458809,
        lng: -127.476556,
      },
    },
    phone: '+1 (861) 564-2877',
    isActive: true,
    age: 21,
    company: 'VOLAX',
  },
  {
    id: 5,
    firstName: 'Weber',
    lastName: 'Bowman',
    email: 'weberbowman@volax.com',
    dob: '1983-02-24',
    address: {
      street: '154 Conway Street',
      city: 'Broadlands',
      zipcode: 8131,
      geo: {
        lat: 54.501351,
        lng: -167.47138,
      },
    },
    phone: '+1 (962) 466-3483',
    isActive: false,
    age: 26,
    company: 'ORBAXTER',
  },
  {
    id: 6,
    firstName: 'Buckley',
    lastName: 'Townsend',
    email: 'buckleytownsend@orbaxter.com',
    dob: '2011-05-29',
    address: {
      street: '131 Guernsey Street',
      city: 'Vallonia',
      zipcode: 6779,
      geo: {
        lat: -2.681655,
        lng: 3.528942,
      },
    },
    phone: '+1 (884) 595-2643',
    isActive: true,
    age: 40,
    company: 'OPPORTECH',
  },
  {
    id: 7,
    firstName: 'Latoya',
    lastName: 'Bradshaw',
    email: 'latoyabradshaw@opportech.com',
    dob: '2010-11-23',
    address: {
      street: '668 Lenox Road',
      city: 'Lowgap',
      zipcode: 992,
      geo: {
        lat: 36.026423,
        lng: 130.412198,
      },
    },
    phone: '+1 (906) 474-3155',
    isActive: true,
    age: 24,
    company: 'GORGANIC',
  },
  {
    id: 8,
    firstName: 'Kate',
    lastName: 'Lindsay',
    email: 'katelindsay@gorganic.com',
    dob: '1987-07-02',
    address: {
      street: '773 Harrison Avenue',
      city: 'Carlton',
      zipcode: 5909,
      geo: {
        lat: 42.464724,
        lng: -12.948403,
      },
    },
    phone: '+1 (930) 546-2952',
    isActive: true,
    age: 24,
    company: 'AVIT',
  },
  {
    id: 9,
    firstName: 'Marva',
    lastName: 'Sandoval',
    email: 'marvasandoval@avit.com',
    dob: '2010-11-02',
    address: {
      street: '200 Malta Street',
      city: 'Tuskahoma',
      zipcode: 1292,
      geo: {
        lat: -52.206169,
        lng: 74.19452,
      },
    },
    phone: '+1 (927) 566-3600',
    isActive: false,
    age: 28,
    company: 'QUILCH',
  },
  {
    id: 10,
    firstName: 'Decker',
    lastName: 'Russell',
    email: 'deckerrussell@quilch.com',
    dob: '1994-04-21',
    address: {
      street: '708 Bath Avenue',
      city: 'Coultervillle',
      zipcode: 1268,
      geo: {
        lat: -41.550295,
        lng: -146.598075,
      },
    },
    phone: '+1 (846) 535-3283',
    isActive: false,
    age: 27,
    company: 'MEMORA',
  },
  {
    id: 11,
    firstName: 'Odom',
    lastName: 'Mills',
    email: 'odommills@memora.com',
    dob: '2010-01-24',
    address: {
      street: '907 Blake Avenue',
      city: 'Churchill',
      zipcode: 4400,
      geo: {
        lat: -56.061694,
        lng: -130.238523,
      },
    },
    phone: '+1 (995) 525-3402',
    isActive: true,
    age: 34,
    company: 'ZORROMOP',
  },
  {
    id: 12,
    firstName: 'Sellers',
    lastName: 'Walters',
    email: 'sellerswalters@zorromop.com',
    dob: '1975-11-12',
    address: {
      street: '978 Oakland Place',
      city: 'Gloucester',
      zipcode: 3802,
      geo: {
        lat: 11.732587,
        lng: 96.118099,
      },
    },
    phone: '+1 (830) 430-3157',
    isActive: true,
    age: 28,
    company: 'ORBOID',
  },
  {
    id: 13,
    firstName: 'Wendi',
    lastName: 'Powers',
    email: 'wendipowers@orboid.com',
    dob: '1979-06-02',
    address: {
      street: '376 Greenpoint Avenue',
      city: 'Elliott',
      zipcode: 9149,
      geo: {
        lat: -78.159578,
        lng: -9.835103,
      },
    },
    phone: '+1 (863) 457-2088',
    isActive: true,
    age: 31,
    company: 'SNORUS',
  },
  {
    id: 14,
    firstName: 'Sophie',
    lastName: 'Horn',
    email: 'sophiehorn@snorus.com',
    dob: '2018-09-20',
    address: {
      street: '343 Doughty Street',
      city: 'Homestead',
      zipcode: 330,
      geo: {
        lat: 65.484087,
        lng: 137.413998,
      },
    },
    phone: '+1 (885) 418-3948',
    isActive: true,
    age: 22,
    company: 'XTH',
  },
  {
    id: 15,
    firstName: 'Levine',
    lastName: 'Rodriquez',
    email: 'levinerodriquez@xth.com',
    dob: '1973-02-08',
    address: {
      street: '643 Allen Avenue',
      city: 'Weedville',
      zipcode: 8931,
      geo: {
        lat: -63.185586,
        lng: 117.327808,
      },
    },
    phone: '+1 (999) 565-3239',
    isActive: true,
    age: 27,
    company: 'COMTRACT',
  },
  {
    id: 16,
    firstName: 'Little',
    lastName: 'Hatfield',
    email: 'littlehatfield@comtract.com',
    dob: '2012-01-03',
    address: {
      street: '194 Anthony Street',
      city: 'Williston',
      zipcode: 7456,
      geo: {
        lat: 47.480837,
        lng: 6.085909,
      },
    },
    phone: '+1 (812) 488-3011',
    isActive: false,
    age: 33,
    company: 'ZIDANT',
  },
  {
    id: 17,
    firstName: 'Larson',
    lastName: 'Kelly',
    email: 'larsonkelly@zidant.com',
    dob: '2010-06-14',
    address: {
      street: '978 Indiana Place',
      city: 'Innsbrook',
      zipcode: 639,
      geo: {
        lat: -71.766732,
        lng: 150.854345,
      },
    },
    phone: '+1 (892) 484-2162',
    isActive: true,
    age: 20,
    company: 'SUREPLEX',
  },
  {
    id: 18,
    firstName: 'Kendra',
    lastName: 'Molina',
    email: 'kendramolina@sureplex.com',
    dob: '2002-07-19',
    address: {
      street: '567 Charles Place',
      city: 'Kimmell',
      zipcode: 1966,
      geo: {
        lat: 50.765816,
        lng: -117.106499,
      },
    },
    phone: '+1 (920) 528-3330',
    isActive: false,
    age: 31,
    company: 'DANJA',
  },
  {
    id: 19,
    firstName: 'Ebony',
    lastName: 'Livingston',
    email: 'ebonylivingston@danja.com',
    dob: '1994-10-18',
    address: {
      street: '284 Cass Place',
      city: 'Navarre',
      zipcode: 948,
      geo: {
        lat: 65.271256,
        lng: -83.064729,
      },
    },
    phone: '+1 (970) 591-3039',
    isActive: false,
    age: 33,
    company: 'EURON',
  },
  {
    id: 20,
    firstName: 'Kaufman',
    lastName: 'Rush',
    email: 'kaufmanrush@euron.com',
    dob: '2011-07-10',
    address: {
      street: '408 Kingsland Avenue',
      city: 'Beaulieu',
      zipcode: 7911,
      geo: {
        lat: 41.513153,
        lng: 54.821641,
      },
    },
    phone: '+1 (924) 463-2934',
    isActive: false,
    age: 39,
    company: 'ILLUMITY',
  },
  {
    id: 21,
    firstName: 'Frank',
    lastName: 'Hays',
    email: 'frankhays@illumity.com',
    dob: '2005-06-15',
    address: {
      street: '973 Caton Place',
      city: 'Dargan',
      zipcode: 4104,
      geo: {
        lat: 63.314988,
        lng: -138.771323,
      },
    },
    phone: '+1 (930) 577-2670',
    isActive: false,
    age: 31,
    company: 'SYBIXTEX',
  },
  {
    id: 22,
    firstName: 'Carmella',
    lastName: 'Mccarty',
    email: 'carmellamccarty@sybixtex.com',
    dob: '1980-03-06',
    address: {
      street: '919 Judge Street',
      city: 'Canby',
      zipcode: 8283,
      geo: {
        lat: 9.198597,
        lng: -138.809971,
      },
    },
    phone: '+1 (876) 456-3218',
    isActive: true,
    age: 21,
    company: 'ZEDALIS',
  },
  {
    id: 23,
    firstName: 'Massey',
    lastName: 'Owen',
    email: 'masseyowen@zedalis.com',
    dob: '2012-03-01',
    address: {
      street: '108 Seaview Avenue',
      city: 'Slovan',
      zipcode: 3599,
      geo: {
        lat: -74.648318,
        lng: 99.620699,
      },
    },
    phone: '+1 (917) 567-3786',
    isActive: false,
    age: 40,
    company: 'DYNO',
  },
  {
    id: 24,
    firstName: 'Lottie',
    lastName: 'Lowery',
    email: 'lottielowery@dyno.com',
    dob: '1982-10-10',
    address: {
      street: '557 Meserole Avenue',
      city: 'Fowlerville',
      zipcode: 4991,
      geo: {
        lat: 54.811546,
        lng: -20.996515,
      },
    },
    phone: '+1 (912) 539-3498',
    isActive: true,
    age: 36,
    company: 'MULTIFLEX',
  },
  {
    id: 25,
    firstName: 'Addie',
    lastName: 'Luna',
    email: 'addieluna@multiflex.com',
    dob: '1988-05-01',
    address: {
      street: '688 Bulwer Place',
      city: 'Harmon',
      zipcode: 7664,
      geo: {
        lat: -12.762766,
        lng: -39.924497,
      },
    },
    phone: '+1 (962) 537-2981',
    isActive: true,
    age: 32,
    company: 'PHARMACON',
  },
];

export const timeActivityItems = [
  {
    date: '01-07-2024',
    firstName: 'Parth',
    lastName: 'Faladu',
    totalDuration: '08 : 14',
    totalWorkPercentage: '85 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Bhoomi',
    lastName: 'Chauhan',
    totalDuration: '08 : 15',
    totalWorkPercentage: '86 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Dhruv',
    lastName: 'Kalola',
    totalDuration: '07 : 45',
    totalWorkPercentage: '80 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Mujaahid',
    lastName: 'Mansuri',
    totalDuration: '08 : 30',
    totalWorkPercentage: '87 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Saurabh',
    lastName: 'Bhatti',
    totalDuration: '08 : 27',
    totalWorkPercentage: '86 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Akshay',
    lastName: 'Patil',
    totalDuration: '07 : 59',
    totalWorkPercentage: '84 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Dwarkesh',
    lastName: 'Ladva',
    totalDuration: '08 : 21',
    totalWorkPercentage: '87 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Pratik',
    lastName: 'Suthar',
    totalDuration: '08 : 27',
    totalWorkPercentage: '86 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Vivek',
    lastName: 'Lodhi',
    totalDuration: '08 : 14',
    totalWorkPercentage: '85 %',
  },
  {
    date: '02-07-2024',
    firstName: 'Dhaval',
    lastName: 'Patel',
    totalDuration: '07 : 45',
    totalWorkPercentage: '80 %',
  },
  {
    date: '02-07-2024',
    firstName: 'Renish',
    lastName: 'Prajapati',
    totalDuration: '07 : 45',
    totalWorkPercentage: '80 %',
  },
  {
    date: '01-07-2024',
    firstName: 'Priti',
    lastName: 'Katari',
    totalDuration: '06 : 00',
    totalWorkPercentage: '65 %',
  },
];

export const getItems = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721382827/screenshots/production/ybh9cc0wllrtres0hboj.png',
    title:
      'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
    description: 'Photo: Samuel Rohl',
    time: '4:00',
    project: 'World School',
  },
  {
    id: '2',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721383072/screenshots/production/menppmyn66orwc1wmgaq.png',
    title:
      'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
    description: 'Photo: Samuel Rohl',
    time: '3:35',
    project: 'Screen monitor',
  },
  {
    id: '3',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721382827/screenshots/production/ybh9cc0wllrtres0hboj.png',
    title:
      "Dummy caption. It's Greek to you. Unless, of course, you're Greek, in which case, it really makes no sense.",
    description: 'Photo: Michael Hull',
    time: '2:00',
    project: 'School Dairy',
  },
  {
    id: '4',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721384076/screenshots/production/ot6f6jgujuvs4xysfjrv.png',
    title: 'This is dummy caption.',
    description: 'Photo: Folkert Gorter',
    time: '4:00',

    project: 'Studio app',
  },
  {
    id: '5',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721383072/screenshots/production/menppmyn66orwc1wmgaq.png',
    title:
      "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
    description: 'Photo: Thomas Lefebvre',
    time: '4:00',
    project: 'World School',
  },
  {
    id: '6',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721384076/screenshots/production/ot6f6jgujuvs4xysfjrv.png',
    title:
      "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
    description: 'Photo: Thomas Lefebvre',
    time: '8:00',
    project: 'Laundary',
  },
  {
    id: '7',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721384076/screenshots/production/ot6f6jgujuvs4xysfjrv.png',
    title:
      "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
    description: 'Photo: Thomas Lefebvre',
    time: '7:24',
    project: 'Studio app',
  },
  {
    id: '8',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721382827/screenshots/production/ybh9cc0wllrtres0hboj.png',
    title:
      "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
    description: 'Photo: Thomas Lefebvre',
    time: '4:00',
    project: 'Laundary',
  },
  {
    id: '9',
    src: 'https://res.cloudinary.com/dfiobsi2j/image/upload/v1721382827/screenshots/production/ybh9cc0wllrtres0hboj.png',
    title:
      "It's a dummy caption. He who searches for meaning here will be sorely disappointed.",
    description: 'Photo: Thomas Lefebvre',
    time: '1:00',
    project: 'Laundary',
  },
];

export const teamMemberItems = [
  {
    member: 'Vivek Lodhi',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Pratik Suthar',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Suhani Gujjar',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Dhruv Kalola',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Khushi Parmar',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Parth Patel',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
  {
    member: 'Pratik Suthar',
    memberType: 'Developer',
    companyName: 'Mayora Info',
    mobileNumber: '919923490890',
    project: 'Studio App',
    status: '',
    action: '',
  },
];

export const projectItems = [
  {
    projectName: 'Studio App',
    date: '01-11-2023',
    status: '',
  },
  {
    projectName: 'Studio App',
    date: '01-11-2023',
    status: '',
  },
  {
    projectName: 'Studio App',
    date: '01-11-2023',
    status: '',
  },
  {
    projectName: 'Studio App',
    date: '01-11-2023',
    status: '',
  },
  {
    projectName: 'Studio App',
    date: '01-11-2023',
    status: '',
  },
];

export const TeamMemberData = [
  {
    id: 1,
    path: 'profile-35.png',
    name: 'Parth',
    type: 'Developer',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 2,
    name: 'Bhumi',
    path: 'profile-35.png',
    type: 'Developer',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 3,
    name: 'Ransom',
    path: 'profile-35.png',
    type: 'Developer',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 4,
    path: 'profile-35.png',
    name: 'Akshay',
    type: 'Developer',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 5,
    name: 'Dhaval',
    path: 'profile-35.png',
    type: 'Developer',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 6,
    name: 'Mujahid',
    path: 'profile-35.png',
    type: 'QA',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 7,
    path: 'profile-35.png',
    name: 'Saurabh',
    type: 'HR',
    company: 'Mayora info',
    mobile: '2343234323',
  },
  {
    id: 8,
    name: 'Pratik',
    path: 'profile-35.png',
    type: 'BDE',
    company: 'Mayora info',
    mobile: '2343234323',
  },
];

export const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'all', label: 'All' },
];

export const projectTableHead = [
  { key: 'projectName', label: 'Project Name' },
  { key: 'createdAt', label: 'Date' },
  { key: 'isScreenshot', label: 'Screenshot' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export const projectOptions = [
  { value: 'All projects', label: 'All Projects' },
  { value: 'schoolDiary app', label: 'SchoolDiary app' },
  { value: 'Screen Monitoring app', label: 'Screen Monitoring app' },
];

export const options = [
  { value: 'parth', label: 'Parth' },
  { value: 'bhoomi', label: 'Bhoomi' },
  { value: 'dhruv', label: 'Dhruv' },
];

export const columns = [
  { accessor: 'date', title: 'Date' },
  { accessor: 'firstName', title: 'First Name' },
  { accessor: 'lastName', title: 'Last Name' },
  { accessor: 'totalDuration', title: 'Total Duration' },
  { accessor: 'totalWorkPercentage', title: 'Total Work Percentage' },
];

export const getScreenshotItem = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719805885/screenshots/production/naq7vrl2tlqoqiratd1i.png',
    slot: '09:00 to 10:00',
  },
  {
    id: '2',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719576952/screenshots/production/vrg8xjoltghr5n8oxtbg.png',
    slot: '10:00 to 11:00',
  },
  {
    id: '3',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719577394/screenshots/production/x1lt1kw7sq3ijlkfkmh7.png',
    slot: '11:00 to 12:00',
  },
  {
    id: '4',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719547237/screenshots/production/p6wjhkx7nm4pyu6plivd.png',
    slot: '12:00 to 13:00',
  },
  {
    id: '5',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719547679/screenshots/production/fitkzuuqxq3qa0yj1bbd.png',
    slot: '13:00 to 14:00',
  },
  {
    id: '6',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719556370/screenshots/production/igbjclxwaacm1voby4bj.png',
    slot: '14:00 to 15:00',
  },
  {
    id: '7',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719556863/screenshots/production/ziaktx61eb4w1xvva8vq.png',
    slot: '15:00 to 16:00',
  },
  {
    id: '8',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719557441/screenshots/production/s7woio7ntrco5iiqb7fx.png',
    slot: '16:00 to 17:00',
  },
  {
    id: '9',
    src: 'https://res.cloudinary.com/dg4sz43wn/image/upload/v1719557942/screenshots/production/c7amnyupl5insb68jgxf.png',
    slot: '17:00 to 18:00',
  },
];
export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const userList = {
  datasets: [
    {
      name: 'Parth',
      series: [5, 6, 4, 11, 5, 10, 8.6],
      color: '#5A67D8',
    },
    {
      name: 'Bhoomi',
      series: [4, 3, 5, 4, 12, 7, 5],
      color: '#F17E7E',
    },
    {
      name: 'Vivek',
      series: [4, 3, 3, 4, 7, 9, 5],
      color: '#BBB557',
    },
  ],
};

export const statusOption = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const CompanyModuleData = [
  {
    id: 1,
    companyName: 'Mayora Infotech',
    companyEmail: 'mayorainfo@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 2,
    companyName: 'Rubbies Solutions',
    companyEmail: 'rubbiessolution@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 3,
    companyName: 'Eco Hub',
    companyEmail: 'ecohub@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 4,
    companyName: 'Ram Infosoft',
    companyEmail: 'raminfos@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 5,
    companyName: 'Critonz',
    companyEmail: 'critonzinfo@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 6,
    companyName: 'Udizz',
    companyEmail: 'info.udizz@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 7,
    companyName: 'Millenium up',
    companyEmail: 'millenium.11@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 8,
    companyName: 'Webinar X',
    companyEmail: 'webx.info@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 9,
    companyName: 'Norman Oscorp',
    companyEmail: 'norman.a1@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
  {
    id: 10,
    companyName: 'Stark Ind',
    companyEmail: 'tstark.info@mail.com',
    companyPhone: '+919923443765',
    companyAddress: 'Ahmedabad',
    companyWebsite: 'www.mayorainfo.com',
  },
];

export const TeamMemberHead = [
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'projects', label: 'Projects' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

export const TeamMemberHeadBase = [
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'projects', label: 'Projects' },
];

export const CompanyHead = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'website', label: 'Website' },
  { key: 'action', label: 'Action' },
];

export const salesByCategory: any = {
  series: [29, 8, 3],
  options: {
    chart: {
      type: 'donut',
      height: 260,
      fontFamily: 'Nunito, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 25,
      colors: isDark ? '#0e1726' : '#fff',
    },
    colors: isDark
      ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f']
      : ['#e2a03f', '#5c1ac3', '#e7515a'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        width: 10,
        height: 10,
        offsetX: -2,
      },
      height: 50,
      offsetY: 20,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '29px',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '26px',
              color: isDark ? '#bfc9d4' : undefined,
              offsetY: 16,
              formatter: (val: any) => {
                return val;
              },
            },
            total: {
              show: true,
              label: 'Total',
              color: '#888ea8',
              fontSize: '29px',
              formatter: (w: any) => {
                return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    labels: ['Working', 'Meeting', 'Activity'],
    states: {
      hover: {
        filter: {
          type: 'none',
          value: 0.15,
        },
      },
      active: {
        filter: {
          type: 'none',
          value: 0.15,
        },
      },
    },
  },
};

export const TimeRegulateTableHead = (userRole: string) => {
  const baseHeaders = [
    { key: 'name', label: 'Name' },
    { key: 'apply date', label: 'Apply Date' },
    { key: 'reqestDate', label: 'Request Date' },
    { key: 'time', label: 'Time' },
    { key: 'project', label: 'Project' },
    { key: 'description', label: 'Description' },
    { key: 'request by', label: 'Request By' },
  ];

  if (userRole === 'Employee') {
    return [...baseHeaders, { key: 'status', label: 'Status' }];
  } else {
    return [...baseHeaders, { key: 'action', label: 'Action' }];
  }
};
export const leaveData = [
  {
    employee: 'John Doe',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Sick Leave',
    period: '2024-09-01 to 2024-09-05',
    numOfDates: 5,
  },
  {
    employee: 'Jane Smith',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Vacation',
    period: '2024-09-10 to 2024-09-15',
    numOfDates: 6,
  },
  {
    employee: 'Alice Johnson',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Personal Leave',
    period: '2024-09-20 to 2024-09-22',
    numOfDates: 3,
  },
  {
    employee: 'John Doe',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Sick Leave',
    period: '2024-09-01 to 2024-09-05',
    numOfDates: 5,
  },
  {
    employee: 'Jane Smith',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Vacation',
    period: '2024-09-10 to 2024-09-15',
    numOfDates: 6,
  },
  {
    employee: 'Alice Johnson',
    avatar: '/assets/images/profile-35.png',
    leaveType: 'Personal Leave',
    period: '2024-09-20 to 2024-09-22',
    numOfDates: 3,
  },
];

export const leaveRecords = [
  {
    employee: 'John Doe',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Privilege Leave',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 5,
    status: 'Approved',
    statusText: 'Approved',
  },
  {
    employee: 'Jane Smith',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Leave Without Pay',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 6,
    status: 'Pending',
    statusText: 'Pending',
  },
  {
    employee: 'Alice Johnson',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Compoff Leaves',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 3,
    status: 'Not Approved',
    statusText: 'Not Approved',
  },
  {
    employee: 'Alice Johnson',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Compoff Leaves',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 3,
    status: 'Not Approved',
    statusText: 'Not Approved',
  },
  {
    employee: 'Alice Johnson',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Compoff Leaves',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 3,
    status: 'Not Approved',
    statusText: 'Not Approved',
  },
  {
    employee: 'Alice Johnson',
    empCode: 'MI20002',
    avatar: `/assets/images/profile-35.png`,
    leaveType: 'Compoff Leaves',
    period: '01-09-2024 to 05-09-2024',
    numOfDays: 3,
    status: 'Not Approved',
    statusText: 'Not Approved',
  },
];

export const LeaveEmployees = [
  {
    name: 'John Doe',
    leaveType: 'Sick Leave',
    fromTo: '2024-09-01 to 2024-09-05',
    days: 5,
    status: 'Approved',
    statusColor: 'green',
  },
  {
    name: 'Jane Smith',
    leaveType: 'Vacation',
    fromTo: '2024-09-10 to 2024-09-15',
    days: 6,
    status: 'Pending',
    statusColor: 'yellow',
  },
  {
    name: 'Alice Johnson',
    leaveType: 'Personal Leave',
    fromTo: '2024-09-20 to 2024-09-22',
    days: 3,
    status: 'Not Approved',
    statusColor: 'red',
  },
];
export const leavePhases = [
  { phase: 'Phase 1', months: 3, approved: 3 },
  { phase: 'Phase 2', months: 3, approved: 4 },
  { phase: 'Phase 3', months: 3, approved: 4 },
  { phase: 'Phase 4', months: 3, approved: 4 },
];

export const formatOptions: any[] = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'rejected', label: 'Rejected' },
];

export const leaveTypeMapping: Record<LeaveRecordType, string> = {
  PL: 'Paid Leave',
  CL: 'Compoff Leaves',
  UPL: 'Un-paid Leave',
};
export const userActivityChart = {
  series: [
    {
      name: 'Sessions',
      data: [100, 130, 160, 150, 140, 180, 170, 160, 200, 180],
    },
  ],
  options: {
    chart: {
      height: 325,
      type: 'bar' as 'bar',
      fontFamily: 'Nunito, sans-serif',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#1E90FF'],
    xaxis: {
      categories: [
        'User A',
        'User B',
        'User C',
        'User D',
        'User E',
        'User F',
        'User G',
        'User H',
        'User I',
        'User J',
      ],
      labels: {
        style: {
          fontSize: '12px',
          cssClass: 'apexcharts-xaxis-title',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      opposite: false,
    },
    grid: {
      borderColor: '#E0E6ED',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '16px',
      markers: {
        width: 10,
        height: 10,
        offsetX: -2,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      marker: {
        show: true,
      },
      x: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.28,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  } as ApexOptions,
};

export const simpleColumnStacked = {
  series: [
    {
      name: 'Working Time',
      data: [6, 7, 6.5, 8, 7.5],
    },
    {
      name: 'Meeting Time',
      data: [0.3, 0.5, 1, 1.5, 1.2],
    },
  ],
  options: {
    chart: {
      height: 300,
      type: 'bar',
      stacked: true,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#2196f3', '#3b3f5c'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 5,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '01/01/2011 GMT',
        '01/02/2011 GMT',
        '01/03/2011 GMT',
        '01/04/2011 GMT',
        '01/05/2011 GMT',
      ],
      axisBorder: {
        color: '#e0e6ed',
      },
    },
    yaxis: {
      opposite: false,
      labels: {
        offsetX: 0,
      },
    },
    grid: {
      borderColor: '#e0e6ed',
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    tooltip: {
      theme: 'light',
    },
    fill: {
      opacity: 0.8,
    },
  },
};

export const fakeData = [
  { id: 1, name: 'John Doe', date: '2024-09-12', description: 'personal' },
  { id: 2, name: 'Jane Smith', date: '2024-09-13', description: 'out of town' },
  {
    id: 3,
    name: 'Alice Johnson',
    date: '2024-09-14',
    description: 'attending seminar',
  },
  { id: 4, name: 'Bob Brown', date: '2024-09-15', description: 'personal' },
  { id: 5, name: 'Carol White', date: '2024-09-16', description: 'sick leave' },
  { id: 6, name: 'Eve Black', date: '2024-09-17', description: 'meet' },
  {
    id: 7,
    name: 'David Wilson',
    date: '2024-09-18',
    description: 'sick leave',
  },
  { id: 8, name: 'Laura Green', date: '2024-09-19', description: 'personal' },
];
export const tableData: AttendanceData[] = [
  {
    name: 'Alice Johnson',
    empCode: 'E123',
    attendanceDetails: [
      { date: '2024-09-02', status: 'Present' },
      { date: '2024-09-03', status: 'Absent' },
      { date: '2024-09-04', status: 'Leave' },
      { date: '2024-09-05', status: 'Present' },
      { date: '2024-09-06', status: 'Present' },
      { date: '2024-09-07', status: 'Week-Off' },
      { date: '2024-09-08', status: 'Week-Off' },
    ],
    totalPresent: 2,
  },
];
export const weekDays: string[] = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const leaveTypeStatus: any = {
  approved: 'Approved',
  pending: 'Pending',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
};

export const maxDaysLimit = {
  PL: 7,
  UPL: 4,
  CL: 3,
};
export const dashboardHolidays = [
  { date: '17 Jun', holiday: 'Bakri Eid', day: 'Monday' },
  { date: '15 Aug', holiday: 'Independence Day', day: 'Thursday' },
  { date: '02 Oct', holiday: 'Gandhi Jayanti', day: 'Friday' },
  { date: '19 Jun', holiday: 'Chrismas', day: 'Monday' },
  { date: '26 Aug', holiday: 'Janmastami', day: 'Monday' },
];

export const dateBackgrounds: any = {
  '17 Jun': 'bg-pink-300',
  '15 Aug': 'bg-green-300',
  '02 Oct': 'bg-blue-300',
  '19 Jun': 'bg-pink-300',
  '26 Aug': 'bg-green-300',
};

export const attendanceStatusMap: Record<AttendanceStatus, string> = {
  WO: 'WO',
  'Half-Day': 'HD',
  Present: 'P',
  Absent: 'A',
  'On Leave': 'L',
  Holiday: 'HLD',
};

export const ProfileNotificationData = [
  { key: 'Activity', label: 'Activity' },
  { key: 'Email', label: 'Email' },
  { key: 'Push', label: 'Push' },
  { key: 'Sms', label: 'Sms' },
];
export const ProfileNotificationTabledata = [
  {
    firstName: 'Mentions',
    SecondName: 'Notify when another user mentions you in a comment',
  },
  {
    firstName: 'Comments',
    SecondName: 'Notify when another user comments your item.',
  },
  { firstName: 'Log in from a new device', SecondName: '' },
];
export const ProfileSessionData = [
  { key: 'Devices', label: 'Devices' },
  { key: 'Action', label: 'Action' },
];
export const ProfileSessionTableData = [
  {
    firstName: 'Chrome on macOS',
    types: 'Active',
  },
  {
    firstName: 'Safari on iPhone',
    types: 'Deactive',
  },
];
export const ProfileSessionStatustype: any = {
  Active: 'Active',
  Deactive: 'Deactive',
};

export const leaveTypes = [
  { label: 'Paid Leave', value: 'PL' },
  { label: 'Sick Leave', value: 'SL' },
  { label: 'Casual Leave', value: 'CL' },
];

export const leaveReasonOptions = [
  { label: 'Medical', value: 'medical' },
  { label: 'Vacation', value: 'vacation' },
  { label: 'Personal', value: 'personal' },
];
export const bloodGroups: FilterByStatus[] = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];
export const GenderSelection: FilterByStatus[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const buttonData: ButtonData[] = [
  {
    section: 'profile',
    icon: <IconUser className='icon-user' />,
    label: 'Profile',
  },
  {
    section: 'profileDetails',
    icon: <IconCardList className='icon-user' />,
    label: 'Details',
  },
  {
    section: 'bankDetails',
    icon: <IconBank className='icon-user' />,
    label: 'Bank',
  },
  {
    section: 'emergencyContact',
    icon: <IconTelephone className='icon-user' />,
    label: 'Emergency',
  },
  {
    section: 'ProfileDocument',
    icon: <IconFileEarmarkFill className='icon-user' />,
    label: 'Document',
  },
  {
    section: 'Notification',
    icon: <IconBell className='icon-user' />,
    label: 'Notification',
  },
  {
    section: 'Sessions',
    icon: <IconActivity className='icon-user' />,
    label: 'Sessions',
  },
];

export const employeeDatas = [
  {
    id: 1,
    name: 'Parth Faldu',
    designation: 'Developer',
    progress: '90%',
    status: 'Complete',
    imageUrl: '/assets/images/product-headphones.jpg',
  },
  {
    id: 2,
    name: 'Bhagat',
    designation: 'Designer',
    progress: '80%',
    status: 'Complete',
    imageUrl: '/assets/images/product-shoes.jpg',
  },
  {
    id: 3,
    name: 'Sagar',
    designation: 'HR',
    progress: '40%',
    status: 'In Progress',
    imageUrl: '/assets/images/product-watch.jpg',
  },
  {
    id: 4,
    name: 'Pratik',
    designation: 'BDE',
    progress: '40%',
    status: 'In Progress',
    imageUrl: '/assets/images/product-laptop.jpg',
  },
  {
    id: 5,
    name: 'Pratik',
    designation: 'BDE',
    progress: '40%',
    status: 'In Progress',
    imageUrl: '/assets/images/product-laptop.jpg',
  },
  {
    id: 6,
    name: 'Pratik',
    designation: 'BDE',
    progress: '40%',
    status: 'In Progress',
    imageUrl: '/assets/images/product-laptop.jpg',
  },
];
export const leaveOptions = [
  { value: 'paid', label: 'paid' },
  { value: 'unpaid', label: 'unpaid' },
];

export const LeaveColourType = [
  { key: 'sickLeave', label: 'Sick Leave' },
  { key: 'vacationLeave', label: 'Vacation Leave' },
  { key: 'personalLeave', label: 'Personal Leave' },
  { key: 'absent', label: 'Absent' },
  { key: 'present', label: 'Present' },
  { key: 'onLeave', label: 'On Leave' },
  { key: 'holiday', label: 'Holiday' },
];

export const settingsOption = [
  {
    id: 1,
    title: 'Leave',
    description: 'This provide basic info of leave',
  },
  {
    id: 2,
    title: 'Attendance',
    description: 'This is basic info of attendance',
  },
  {
    id: 3,
    title: 'Productivity',
    description: 'This is basic info of Productivity',
  },
  {
    id: 4,
    title: 'Slack configuration',
    description: 'This is basic info of Slack configuration',
  },
  {
    id: 5,
    title: 'Jira setup',
    description: 'This is basic info of Jira setup',
  },
];

export const ProductivityRange = [
  {
    id: 1,
    rangeTitle: 'unproductiveColor',
    value: 'unproductiveColor',
    key: '0-30',
  },

  {
    id: 2,
    rangeTitle: 'neutralColor',
    value: 'neutralColor',
    key: '30-60',
  },
  {
    id: 3,
    rangeTitle: 'productiveColor',
    value: 'productiveColor',
    key: '60-100',
  },
];

export const dashboardProjectTable = [
  {
    id: 1,
    name: 'John Doe',
    email: 'Macko Pro',
    description: '16 : 08',
    members: [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'Designing',
    description: '24 : 30',
    members: [
      { firstName: 'Alice', lastName: 'Johnson' },
      { firstName: 'Bob', lastName: 'Williams' },
    ],
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'Designing',
    description: '24 : 30',
    members: [
      { firstName: 'Alice', lastName: 'Johnson' },
      { firstName: 'Bob', lastName: 'Williams' },
    ],
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'Designing',
    description: '24 : 30',
    members: [
      { firstName: 'Alice', lastName: 'Johnson' },
      { firstName: 'Bob', lastName: 'Williams' },
    ],
  },
  {
    id: 5,
    name: 'Jane Smith',
    email: 'Designing',
    description: '24 : 30',
    members: [
      { firstName: 'Alice', lastName: 'Johnson' },
      { firstName: 'Bob', lastName: 'Williams' },
    ],
  },
  {
    id: 6,
    name: 'Jane Smith',
    email: 'Designing',
    description: '24 : 30',
    members: [
      { firstName: 'Alice', lastName: 'Johnson' },
      { firstName: 'Bob', lastName: 'Williams' },
    ],
  },
];
