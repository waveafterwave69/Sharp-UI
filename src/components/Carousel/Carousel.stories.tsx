import Carousel from "./Carousel.tsx";
import type {Meta, StoryObj} from "@storybook/react-vite";
import Button from "../Button/Button.tsx";
import {Accordion} from "../Accrodion/Accrodion.tsx";
import Card from "../Card/Card.tsx";

const meta: Meta<typeof Carousel> = {
    title: 'Компоненты/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    argTypes: {
        borderRadius: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
        },
    },
}

export default meta;

type Story = StoryObj<typeof Carousel>

export const Playground: Story = {
    render: (args) => {

        return (
            <>
                <Carousel
                    borderRadius={args.borderRadius}
                >
                    <Card appearance='primary'>
                        <div style={{ padding: '20px', width: '350px' }}>
                            <img
                                src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                                alt="Product"
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            <h3 style={{ margin: '15px 0 10px', marginBottom: '10px' }}>
                                РИК ОВЕНС
                            </h3>
                            <Accordion
                                appearance="secondary"
                                title="инфа о пацыке"
                                description=" реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer."
                            />

                            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                3 500 ₽
                            </div>
                            <Button
                                appearance="secondary"
                                borderRadius="xs"
                                style={{ width: '100%', marginTop: '10px' }}
                            >
                                Купить
                            </Button>
                        </div>
                    </Card>
                    <Card appearance='primary'>
                        <div style={{ padding: '20px', width: '350px' }}>
                            <img
                                src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                                alt="Product"
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            <h3 style={{ margin: '15px 0 10px', marginBottom: '10px' }}>
                                РИК ОВЕНС
                            </h3>
                            <Accordion
                                appearance="secondary"
                                title="инфа о пацыке"
                                description=" реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer."
                            />

                            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                3 500 ₽
                            </div>
                            <Button
                                appearance="secondary"
                                borderRadius="xs"
                                style={{ width: '100%', marginTop: '10px' }}
                            >
                                Купить
                            </Button>
                        </div>
                    </Card>
                    <Card appearance='primary'>
                        <div style={{ padding: '20px', width: '350px' }}>
                            <img
                                src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                                alt="Product"
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            <h3 style={{ margin: '15px 0 10px', marginBottom: '10px' }}>
                                РИК ОВЕНС
                            </h3>
                            <Accordion
                                appearance="secondary"
                                title="инфа о пацыке"
                                description=" реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer."
                            />

                            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                3 500 ₽
                            </div>
                            <Button
                                appearance="secondary"
                                borderRadius="xs"
                                style={{ width: '100%', marginTop: '10px' }}
                            >
                                Купить
                            </Button>
                        </div>
                    </Card>
                    <Card appearance='primary'>
                        <div style={{ padding: '20px', width: '350px' }}>
                            <img
                                src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                                alt="Product"
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            <h3 style={{ margin: '15px 0 10px', marginBottom: '10px' }}>
                                РИК ОВЕНС
                            </h3>
                            <Accordion
                                appearance="secondary"
                                title="инфа о пацыке"
                                description=" реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer."
                            />

                            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                3 500 ₽
                            </div>
                            <Button
                                appearance="secondary"
                                borderRadius="xs"
                                style={{ width: '100%', marginTop: '10px' }}
                            >
                                Купить
                            </Button>
                        </div>
                    </Card>
                    <Card appearance='primary'>
                        <div style={{ padding: '20px', width: '350px' }}>
                            <img
                                src="https://gagosian.com/media/images/quarterly/interview-fashion-and-art-rick-owens/vqh7Pr0UOhwL_600x600.jpg"
                                alt="Product"
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                            <h3 style={{ margin: '15px 0 10px', marginBottom: '10px' }}>
                                РИК ОВЕНС
                            </h3>
                            <Accordion
                                appearance="secondary"
                                title="инфа о пацыке"
                                description=" реальный жесткий тру designer. реальный жесткий тру
                    designer. реальный жесткий тру designer. реальный жесткий
                    тру designer."
                            />

                            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                3 500 ₽
                            </div>
                            <Button
                                appearance="secondary"
                                borderRadius="xs"
                                style={{ width: '100%', marginTop: '10px' }}
                            >
                                Купить
                            </Button>
                        </div>
                    </Card>
                </Carousel>
            </>
        )
    },
    args: {
        borderRadius: 'none'
    }
}