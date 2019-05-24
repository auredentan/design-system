import React, { useContext } from 'react';

import { Button, NotificationTheme } from 'LumX';
import { NotificationProvider } from 'LumX/components/notification/react/NotificationProvider';
import { NotificationState, notificationContext } from 'LumX/components/notification/react/types';

/////////////////////////////

interface IProps {
    /**
     * The theme to use to display this demo.
     */
    theme: NotificationTheme;
}

/////////////////////////////

/**
 * The demo for the default <Notification>s.
 *
 * @return {React.ReactElement} The demo component.
 */
const DemoComponent: React.FC<IProps> = ({ theme }: IProps): React.ReactElement => (
    <>
        <NotificationProvider>
            <NotificationClient theme={theme} />
        </NotificationProvider>
    </>
);

const NotificationClient: React.FC<IProps> = ({ theme }: IProps): React.ReactElement => {
    const { error, info, success, warning }: NotificationState = useContext(notificationContext);

    return (
        <>
            <Button
                type="button"
                theme={theme}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                    info({
                        content: event.currentTarget.value,
                    })
                }
                value="Info"
            >
                Info
            </Button>{' '}
            <Button
                type="button"
                theme={theme}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                    success({
                        content: event.currentTarget.value,
                    })
                }
                value="Success"
            >
                Success
            </Button>{' '}
            <Button
                type="button"
                theme={theme}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                    warning({
                        content: event.currentTarget.value,
                    })
                }
                value="Warning"
            >
                Warning
            </Button>{' '}
            <Button
                type="button"
                theme={theme}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                    error({
                        content: event.currentTarget.value,
                    })
                }
                value="Error"
            >
                Error
            </Button>{' '}
            <Button
                type="button"
                theme={theme}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void =>
                    info({
                        actionCallback: (): void => alert('Coucou'),
                        actionLabel: 'Coucou',
                        content: event.currentTarget.value,
                    })
                }
                value="info with callback"
            >
                Info with callback
            </Button>{' '}
        </>
    );
};

/////////////////////////////

export default {
    view: DemoComponent,
};
