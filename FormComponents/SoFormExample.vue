<template>
    <div class="col-8 my-5">
        <div class="card shadow-lg">
            <div class="card-header">Test Form</div>
            <div class="card-body">
                <so-form 
                    :form="form"
                    @success="success"
                >
                </so-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                options: {
                    route: '/lessons',
                    method: 'post',
                },

                schema: [
                    {
                        name: 'title',
                        type: 'text',
                        value: '',
                        required: false,
                    },
                    {
                        name: 'public',
                        type: 'radio',
                        value: '',
                        label: 'Radios',
                        options: [
                            {
                                label: 'Option 1',
                                value: false,
                            },
                            {
                                label: 'Option 2',
                                value: true,
                            }
                        ]
                    },
                    {
                        name: 'check',
                        type: 'checkbox',
                        value: [],
                        label: 'Checkbox',
                        options: [
                            {
                                label: 'Option 1',
                                value: false,
                            },
                            {
                                label: 'Option 2',
                                value: true,
                            }
                        ]
                    },
                    {
                        name: 'public',
                        type: 'select',
                        value: '',
                        label: 'Select',
                        placeholder: '',
                        required: false,
                        options: [
                            {
                                label: 'Option 1',
                                value: false,
                            },
                            {
                                label: 'Option 2',
                                value: true,
                            }
                        ]
                    }
                ]
            }
        }
    },

    methods: {
        success(data) {
            console.log(data);
        }
    }
}
</script>

