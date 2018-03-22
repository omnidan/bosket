// @flow

import React from "react"
import { array } from "@bosket/tools"
import { TreeNode } from "@bosket/core"
import { withTransition } from "../traits"

import type { Key } from "react"
import type { TreeNodeInput } from "@bosket/core"

type TreeViewNodeProps = {
    model:              Object[],
    category:           string,
    selection:          Object[],
    onSelect:           (item: Object, ancestors: Object[], neighbours: Object[]) => void,
    ancestors:          Object[],
    strategies?:        Object,
    disabled?:          Object => boolean,
    dragndrop?:         Object,
    css?:               { [key: string]: string },
    async?:             (mixed => Promise<Object[]>) => Promise<Object[]>,
    depth?:             number,
    sort?:              (Object, Object) => number,
    unique?:            Object => Key,
    display?:           (Object, Object) => any,
    filteredModel:      null | Map<Object, *>,
    folded:             boolean,
    loading?:           boolean,
    openerOpts:         { position?: "none" | "left" | "right" },
    opener?:            Class<React.Component<*, *>>,
    searched:           boolean
}

type TreeViewNodeState = { unfolded: Object[] }

/* Node component */
class TreeViewNodeBaseClass extends React.PureComponent<TreeViewNodeProps, TreeViewNodeState> {

    /* Lifecycle & data */
    node: TreeNode
    _unmounted: boolean
    ancestorsMap : Map<Object, Object[]> = new Map()

    state : TreeViewNodeState = {
        unfolded: []
    }

    constructor(props: TreeViewNodeProps & TreeNodeInput) {
        super(props)

        const _props = {
            get: () => this.props
        }
        const _state = {
            get: () => this.state,
            set: (s: Object) => this.setState(s)
        }

        this.node = new TreeNode(
            _props,
            {},
            _state,
            () => { if(!this._unmounted) this.forceUpdate() }
        )

        if(this.props.model instanceof Array) {
            this.props.model.forEach(item => item && this.ancestorsMap.set(item, [ ...this.props.ancestors, item ]))
        }
    }

    componentWillUnmount() {
        this._unmounted = true
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.model !== nextProps.model) {
            if(nextProps.model instanceof Array) {
                const newMap = new Map()
                nextProps.model.forEach(item => {
                    if(!item) return
                    const lastVal = this.ancestorsMap.get(item)
                    if(lastVal)
                        newMap.set(item, lastVal)
                    else
                        newMap.set(item, [ ...this.props.ancestors, item ])
                })
                this.ancestorsMap = newMap
            }
        }
    }

    /* Rendering */

    renderSubtree(item: Object) {
        if(!this.node.hasChildren(item) && !this.node.isAsync(item))
            return null

        let childModel = item[this.props.category]
        let filteredModel = null

        /* If data has to be retrieved asynchronously */
        if(this.node.isAsync(item) && !this.node.isFolded(item) && !array(this.node.pending).contains(item)) {
            this.node.unwrapPromise(item)
        }
        if(!this.node.isAsync(item)) {
            childModel = this.props.sort ? childModel.sort(this.props.sort) : childModel
        }
        if(this.props.filteredModel) {
            filteredModel = this.props.filteredModel.get(item)
        }

        return  (
            <TreeViewNode
                { ...(this.props: TreeViewNodeProps) }
                model={ childModel }
                filteredModel={ filteredModel }
                ancestors={ this.ancestorsMap.get(item) || [] }
                depth={ (this.props.depth || 0) + 1 }
                folded={ this.node.isFolded(item) }
                loading={ this.node.isAsync(item) && !this.node.isFolded(item) }>
            </TreeViewNode>
        )
    }

    renderOpener(item: Object, OpenerComponent: Class<React.Component<*, *>> | string) {
        return position =>
            (this.node.hasChildren(item) || this.node.isAsync(item)) && this.props.openerOpts.position === position ?
                <OpenerComponent item={item} className={ this.node.mixCss("opener") } onClick={ this.node.onOpener(item) }></OpenerComponent> :
                null
    }

    render() {
        const { model, folded, display, unique, loading } = this.props

        if(folded)
            return null

        /* If data has to be retrieved asynchronously */
        if(loading) {
            return <span></span>
        }

        const OpenerComponent = this.props.opener || "span"
        const list = model
            .filter(m => !this.props.searched || this.props.filteredModel && this.props.filteredModel.has(m))
            .map((item, idx) => {
                let result
                if(typeof display === "function") {
                    result = display(item, this.props)
                    if(!result) { // item hidden, don't render it
                        return false
                    }
                }
                return (
                    <li key={ unique && unique(item) || idx }
                        className={ this.node.liCss(item) }
                        { ...this.node.getDragEvents(item) }>
                        <span className={ this.node.mixCss("item") } onClick={ this.node.onClick(item) }>
                            { this.renderOpener(item, OpenerComponent)("left") }
                            { result }
                            { this.renderOpener(item, OpenerComponent)("right") }
                        </span>
                        { this.renderSubtree(item) }
                    </li>
                )
            })
            .filter(item => item !== false)

        return (
            <ul className={ this.node.ulCss() }
                { ...this.node.getDragEvents(null, !this.props.depth) }>
                { list }
            </ul>
        )
    }
}
export const TreeViewNode = withTransition({ key: props => props.folded || props.loading })(TreeViewNodeBaseClass)
