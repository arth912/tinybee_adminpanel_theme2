// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
    IconApps,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    icon: icons.IconApps,
    type: 'group',
    children: [
        {
            id: 'user-list',
            title: <FormattedMessage id="Users List" />,
            type: 'item',
            url: '/user/user-list'
        },
        {
            id: 'product-list',
            title: <FormattedMessage id="Products List" />,
            type: 'item',
            url: '/product/product-list'
        },
        {
            id: 'order-list',
            title: <FormattedMessage id="Orders List" />,
            type: 'item',
            url: '/order/order-list'
        }
    ]
};

export default application;
