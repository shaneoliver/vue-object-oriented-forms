<template>
    <div class="col-12 mb-4">

        <!-- Input label -->
        <label v-if="settings.label">{{ settings.label }}</label>

        <!-- Input element -->
        <select 
            v-model="input.value"
            class="form-control" 
            :class="error ? 'is-invalid' : ''"
            :type="settings.type" 
            :placeholder="settings.placeholder"
            :required="settings.required"
            :name="settings.name">

            <option disabled value="" v-if="settings.placeholder">{{ settings.placeholder }}</option>

            <option 
                v-for="(option, index) in input.options"
                :value="option.value"
                >{{ option.label }}
            </option>

        </select>
        
        <!-- Input help text -->
        <small class="form-text" :class="error ? 'text-danger' : 'text-muted'" v-if="settings.help">
            {{ settings.help }}
        </small>

        <!-- Input validation feedback -->
        <span v-if="error" class="invalid-feedback" role="alert">
            <strong>{{ error }}</strong>
        </span>

    </div>
</template>

<script>
import { input } from './Input';

export default {
    mixins: [input]
}
</script>