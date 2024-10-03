INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Basic',
        'Client',
        'basic@340.edu',
        '$2a$10$WZFQuxhVNABHJqTVj9WoyemMeDFA3z1KzdFG2CaXUFAkaDNQ48BdC',
        DEFAULT
    ),
    (
        'Happy',
        'Employee',
        'happy@340.edu',
        '$2a$10$iqdE.DW.0HjzC9cirux59ONxF0lY2bEOaq2QHG01NAOkgnKJof9VS',
        'Employee'
    ),
    (
        'Manager',
        'User',
        'manager@340.edu',
        '$2a$10$WZODtuL9heyYDlOEQxZ2Eec0phOwlYXJk8nLUnQW0nzXLH68Mll.2',
        'Admin'
    );