<template>
    <form method="POST" 
        @submit.prevent="submit" 
        @keydown="errors.clear($event.target.name)"
        @change="errors.clear($event.target.name)">
        
        <div class="form-row">
            <slot name="header"></slot>
            <component 
                v-for="(input, index) in form.schema" 
                v-bind:is="component(input)" 
                :key="index"
                :input="input"
                :error="errors.get(input.name)">
            </component>

            <div class="d-flex w-100">
                <button 
                    class="btn btn-primary shadow" 
                    type="submit" 
                    :disabled="errors.any()"
                >
                    <span v-html="loading ? this.settings.loadingIcon : this.settings.button"></span>
                </button>

                <button 
                    v-if="settings.cancel" 
                    class="btn btn-link" 
                    @click.prevent="cancel">cancel</button>
            </div>

        </div>
    </form>
</template>

<script>

import Errors from './Errors';

import SoInputBoolean from './SoInputBoolean.vue';
import SoInputText from './SoInputText.vue';
import SoInputTextarea from './SoInputTextarea.vue';
import SoInputSelect from './SoInputSelect.vue';

export default {

    components: { 
        SoInputBoolean,
        SoInputSelect,
        SoInputText,
        SoInputTextarea,
    },

    props: {
        form: {
            type: Object,
            required: true,
        }
    },

    mounted() {
        this.defaults = {
            route: '/',
            method: 'post',
            button: 'Submit',
            loadingIcon: `<svg aria-hidden="true" data-prefix="far" data-icon="spinner-third" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-spinner-third rotate-center"><path fill="currentColor" d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" class=""></path></svg>`,
            cancel: false,
        };

        // Merge the given options with the defaults
        this.settings = Object.assign({}, this.defaults, this.form.options);
    },

    data() {
        return {
            errors: new Errors(),
            loading: false,
            settings: {},
        }
    },

    methods: {
        handleChange(event) {
            console.log(event.target);
        },
        component(input) {
            switch (input.type) {
                case 'checkbox':
                case 'radio':
                    return 'so-input-boolean';
                    break;

                case 'radio':
                    return 'so-input-boolean';
                    break;

                case 'select':
                    return 'so-input-select';
                    break;
                
                case 'textarea':
                    return 'so-input-textarea';
                    break;
            
                default:
                    return `so-input-text`;
                    break;
            }
        },

        submit() {
            this.$emit('submitting');
            this.loading = true;

            axios[this.settings.method](this.settings.route, this.formatData())
                .then(response => {
                    this.reset();
                    this.$emit('success', response);
                })
                .catch(error => {
                    this.errors.record(error.response.data);
                    this.loading = false;
                    this.$emit('error', error);
                });
        },

        cancel() {
            this.reset();
            this.$emit('cancelled');
        },

        reset() {
            this.form.schema.forEach(element => {
                element.value = '';
            });
            this.errors.clear();
            this.loading = false;
            this.$emit('reset');
        },

        /**
         * Create a well formatted key:value object to pass to the form's action
         */
        formatData() {
            let data = {};

            this.form.schema.forEach(element => {
                data = Object.assign({
                    [element.name]: element.value
                }, data)
            });

            return data;
        }
    }
}
</script>

<style>

    .rotate-center {
        animation: rotate-center 0.6s ease-in-out infinite both;
    }

    @keyframes rotate-center {
        0% {
            -webkit-transform: rotate(0);
                    transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }

</style>
