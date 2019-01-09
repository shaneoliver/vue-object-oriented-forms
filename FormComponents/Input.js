export const input = {
    props: {
        input: {
            type: Object,
            required: true,
        },

        error: {
            type: String,
            required: false,
        }
    },

    data() {
        return {
            settings: {},
        }
    },

    mounted() {
        this.defaults = {
            name: '',
            type: 'text',
            required: true,
            placeholder: '',
            label: '',
            help: '',
            min: 0,
            max: 100,
            step: 1,
        },

        // Merge the given input attributes with the defaults
        this.settings = Object.assign(this.defaults, this.input);
    }
}