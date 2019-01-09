<template>
    <div class="col-12 mb-4">

        <!-- Input label -->
        <label v-if="settings.label">{{ settings.label }}</label>

        <!-- Input element -->
        <textarea 
            v-model="input.value"
            class="form-control" 
            :class="error ? 'is-invalid' : ''"
            :placeholder="settings.placeholder"
            :required="settings.required"
            :name="settings.name"
            :rows="settings.rows">
        </textarea>
        
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