<template>
    <div class="col-12 mb-4">
        
        <!-- Input label -->
        <label v-if="settings.label">{{ settings.label }}</label>

        <!-- Input element -->
        <div 
            class="custom-control"
            :class="`custom-${settings.type}`"
            v-for="(option, index) in input.options" 
            :key="index"
        >
            <input 
                class="custom-control-input" 
                :class="error ? 'is-invalid' : ''"
                :type="settings.type" 
                :value="option.value"
                v-model="input.value" 
                :id="`${input.name}-${index}`"
                :name="settings.name">
            <label class="custom-control-label" :for="`${input.name}-${index}`">
                {{ option.label }}
            </label>
        </div>
                
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

