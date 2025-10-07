const LoggedOutHeaderLinks = [
    {
        link: '/login',
        text: 'Login'
    },
        {
        link: '/register',
        text: 'Sign Up'
    }
];
const userHeaderLinks = [
    {
        link: '/home',
        text: 'Home'
    },
    {
        link: '/liked',
        text: 'Liked'
    },
    {
        link: '/me',
        text: 'Account'
    }
];
const adminHeaderLinks = [
    {
        link: '/home',
        text: 'Home'
    },
    {
        link: '/admin/add-post',
        text: 'Add Post'
    },
    {
        link: '/liked',
        text: 'Liked'
    },
    {
        link: '/me',
        text: 'Account'
    }
];

export { LoggedOutHeaderLinks, userHeaderLinks, adminHeaderLinks};
