import { Notification } from 'rsuite';

type NotificationType  = 'info' | 'success' | 'warning' | 'error';

const NotificationMessage = (type: NotificationType, header: any, body: any) => {

    return <Notification closable type={type} header={header}>
        {body}
    </Notification>
}

export default NotificationMessage