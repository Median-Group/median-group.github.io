
let wasm;

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*/
export class State {

    static __wrap(ptr) {
        const obj = Object.create(State.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_state_free(ptr);
    }
    /**
    * @returns {State}
    */
    static new() {
        return State.__wrap(wasm.state_new());
    }
    /**
    * @param {number} year_min
    * @param {number} year_max
    * @returns {void}
    */
    set_year_range(year_min, year_max) {
        return wasm.state_set_year_range(this.ptr, year_min, year_max);
    }
    /**
    * @param {string} mode
    * @returns {void}
    */
    set_mode(mode) {
        const ptr0 = passStringToWasm(mode);
        const len0 = WASM_VECTOR_LEN;
        return wasm.state_set_mode(this.ptr, ptr0, len0);
    }
    /**
    * @param {number} last
    * @returns {void}
    */
    set_last(last) {
        return wasm.state_set_last(this.ptr, last);
    }
    /**
    * @param {number} new_x
    * @param {number} new_y
    * @returns {void}
    */
    add_point(new_x, new_y) {
        return wasm.state_add_point(this.ptr, new_x, new_y);
    }
    /**
    * @returns {void}
    */
    reset_progress() {
        return wasm.state_reset_progress(this.ptr);
    }
    /**
    * @returns {void}
    */
    draw_dist() {
        return wasm.state_draw_dist(this.ptr);
    }
    /**
    * @param {number} n
    * @returns {void}
    */
    set_num_samples(n) {
        return wasm.state_set_num_samples(this.ptr, n);
    }
    /**
    * @param {number} min
    * @param {number} q
    * @returns {void}
    */
    set_pareto(min, q) {
        return wasm.state_set_pareto(this.ptr, min, q);
    }
    /**
    * @param {number} min
    * @returns {void}
    */
    set_pareto_uniform(min) {
        return wasm.state_set_pareto_uniform(this.ptr, min);
    }
    /**
    * @param {number} min
    * @param {number} alpha
    * @param {number} beta
    * @returns {void}
    */
    set_pareto_beta(min, alpha, beta) {
        return wasm.state_set_pareto_beta(this.ptr, min, alpha, beta);
    }
    /**
    * @returns {void}
    */
    draw_insights() {
        return wasm.state_draw_insights(this.ptr);
    }
    /**
    * @returns {void}
    */
    draw_timeline() {
        return wasm.state_draw_timeline(this.ptr);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__widl_f_body_Document = function(arg0) {

        const val = getObject(arg0).body;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_create_element_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            return addHeapObject(getObject(arg0).createElement(varg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_text_content_Node = function(arg0, arg1, arg2) {
        let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
        getObject(arg0).textContent = varg1;
    };
    imports.wbg.__widl_f_set_attribute_Element = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            getObject(arg0).setAttribute(varg1, varg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_append_with_node_1_Element = function(arg0, arg1) {
        try {
            getObject(arg0).append(getObject(arg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_HTMLElement = function(arg0) {
        return getObject(arg0) instanceof HTMLElement;
    };
    imports.wbg.__widl_f_offset_height_HTMLElement = function(arg0) {
        return getObject(arg0).offsetHeight;
    };
    imports.wbg.__widl_f_offset_width_HTMLElement = function(arg0) {
        return getObject(arg0).offsetWidth;
    };
    imports.wbg.__widl_f_remove_Element = function(arg0) {
        getObject(arg0).remove();
    };
    imports.wbg.__wbg_stringify_1459392978b44368 = function(arg0) {
        try {
            return addHeapObject(JSON.stringify(getObject(arg0)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg0);
        if (typeof(obj) !== 'string') return 0;
        const ptr = passStringToWasm(obj);
        getUint32Memory()[arg1 / 4] = WASM_VECTOR_LEN;
        return ptr;
    };
    imports.wbg.__widl_f_get_element_by_id_Document = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);

        const val = getObject(arg0).getElementById(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_instanceof_HTMLCanvasElement = function(arg0) {
        return getObject(arg0) instanceof HTMLCanvasElement;
    };
    imports.wbg.__widl_f_get_context_HTMLCanvasElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {

            const val = getObject(arg0).getContext(varg1);
            return isLikeNone(val) ? 0 : addHeapObject(val);

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_CanvasRenderingContext2D = function(arg0) {
        return getObject(arg0) instanceof CanvasRenderingContext2D;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(varg0);
    };
    imports.wbg.__widl_f_save_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).save();
    };
    imports.wbg.__widl_f_translate_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        try {
            getObject(arg0).translate(arg1, arg2);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_rotate_CanvasRenderingContext2D = function(arg0, arg1) {
        try {
            getObject(arg0).rotate(arg1);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_text_baseline_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).textBaseline = varg1;
    };
    imports.wbg.__widl_f_set_font_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).font = varg1;
    };
    imports.wbg.__widl_f_fill_text_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {
            getObject(arg0).fillText(varg1, arg3, arg4);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_restore_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).restore();
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        return getObject(arg0) instanceof Window;
    };
    imports.wbg.__widl_f_begin_path_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__widl_f_stroke_CanvasRenderingContext2D = function(arg0) {
        getObject(arg0).stroke();
    };
    imports.wbg.__widl_f_set_stroke_style_CanvasRenderingContext2D = function(arg0, arg1) {
        getObject(arg0).strokeStyle = getObject(arg1);
    };
    imports.wbg.__widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__widl_f_line_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        getObject(arg0).lineTo(arg1, arg2);
    };
    imports.wbg.__widl_f_move_to_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        getObject(arg0).moveTo(arg1, arg2);
    };
    imports.wbg.__widl_f_fill_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__widl_f_document_Window = function(arg0) {

        const val = getObject(arg0).document;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__wbg_newnoargs_3b5b9eb6cc86e4f9 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_call_90045f2b8d244177 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_debug_string = function(ret, arg0) {

        const retptr = passStringToWasm(debugString(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__widl_f_width_HTMLCanvasElement = function(arg0) {
        return getObject(arg0).width;
    };
    imports.wbg.__widl_f_height_HTMLCanvasElement = function(arg0) {
        return getObject(arg0).height;
    };
    imports.wbg.__widl_f_stroke_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).strokeRect(arg1, arg2, arg3, arg4);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

